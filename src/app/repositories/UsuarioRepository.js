const db = require('../database/models')
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class UsuarioRepository {

    async verificar(dados, idU) {
        try {
            if (dados.cadastro) {
                const invalido = await db.usuarios.findOne({
                    where: {
                        [Op.or]: [
                            { email: dados.cadastro.email },
                            { cpf: dados.cadastro.cpf },
                            { telefone: dados.cadastro.telefone }
                        ]
                    }
                })
                if (invalido) {
                    if (invalido.cpf === dados.cadastro.cpf) {
                        return 'CPF já cadastrado'
                    } else if (invalido.email === dados.cadastro.email) {
                        return 'Email já cadastrado'
                    } else {
                        return 'Telefone já cadastrado'
                    }
                }
            }

            if (dados.login) {
                const valido = await db.usuarios.findOne({
                    attributes: ['idUsuario', 'email', 'senha', 'deletado'],
                    where: { email: dados.login.email }
                })
                if (valido) {
                    if (valido.deletado === 'F') {
                        const verificarSenha = bcrypt.compareSync(dados.login.senha, valido.senha)
                        if (!verificarSenha) {
                            return 'Senha incorreta!'
                        }

                        return valido
                    } else {
                        return 'Conta deletada'
                    }
                } else {
                    return 'Email não cadastrado'
                }
            }

            if (dados.usuario) {
                if (dados.usuario.telefone || dados.usuario.email) {
                    const invalido = await db.usuarios.findOne({
                        where: {
                            [Op.or]: [
                                { email: dados.usuario.email },
                                { telefone: dados.usuario.telefone }
                            ],
                            [Op.not]: [
                                { idUsuario: idU }
                            ]
                        }
                    })
                    if (invalido) {
                        if (invalido.email === dados.usuario.email) {
                            return 'Email já cadastrado'
                        } else {
                            return 'Telefone já cadastrado'
                        }
                    }
                }
                const senha = await db.usuarios.findByPk(idU)
                const verificarSenha = bcrypt.compareSync(dados.usuario.senha, senha.senha)
                if (!verificarSenha) {
                    return 'Senha incorreta!'
                }
            }

            return false

        } catch {
            console.error(error)
        }
    }

    async cadastrar(cadastro) {
        try {
            const verificar = await this.verificar(cadastro)

            if (!verificar) {
                await db.usuarios.create(cadastro.cadastro)
                return false
            }
            return verificar

        } catch (error) {
            console.error(error)
        }

    }

    async login(login) {
        try {
            const verificar = await this.verificar(login)
            return verificar

        } catch (error) {
            console.error(error)
        }
    }

    async usuarioInfo(idU) {
        try {
            const usuario = await db.usuarios.findByPk(idU, {
                attributes: ['nome', 'cpf', 'email', 'foto', 'telefone', 'dataNascimento']
            })
            return usuario ? usuario : 'Essa conta foi deletada, para recuperar entre em contato.'

        } catch (error) {
            console.error(error)
        }
    }

    async recuperar() {

    }

    async atualaizar(idU, usuario) {
        try {
            const verificar = await this.verificar(usuario, idU)
            if (!verificar) {
                if (usuario.usuario.novaSenha) {
                    usuario.usuario.senha = usuario.usuario.novaSenha
                } else {
                    delete usuario.usuario.senha
                }

                await db.usuarios.update(usuario.usuario, {
                    where: { idUsuario: idU }
                })
                return false
            }
            return verificar

        } catch (error) {
            console.error(error)
        }
    }

}

module.exports = new UsuarioRepository()
