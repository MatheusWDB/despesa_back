const db = require('../database/models')
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class UsuarioRepository {

    async verificar(dados) {
        try {
            const verificado = await db.usuarios.findOne({
                where: {
                    [Op.or]: [
                        { email: dados.email },
                        { cpf: dados.cpf }
                    ]
                }
            })
            if (verificado) {
                if (verificado.cpf === dados.cpf) {
                    return 'CPF já cadastrado'
                } else {
                    return 'Email já cadastrado'
                }
            } else {
                return true
            }
        } catch {

        }
    }

    async cadastrar(cadastro) {
        try {
            const [newCadastro, criado] = await db.usuarios.findOrCreate({
                where: {
                    telefone: cadastro.telefone
                },
                defaults: cadastro
            })

            return criado
                ? newCadastro
                : 'Telefone já cadastrado!'
        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados');
        }

    }

    async login(login, token) {
        try {
            if (token) {
                return
            }

            const usuario = await db.usuarios.findOne({
                attributes: ['idUsuario', 'email', 'senha'],
                where: {
                    email: login.email,
                    deletado: 'F'
                }
            })

            if (usuario) {
                const verificarSenha = bcrypt.compareSync(login.senha, usuario.senha);
                if (verificarSenha) {
                    return usuario
                } else {
                    return 'Senha incorreta!'
                }
            }
            return 'Email não cadastrado!'
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
            if (usuario.email) {
                const email = await db.usuarios.findOne({
                    where: {
                        email: usuario.email,
                        [Op.not]: [{ idUsuario: idU }]
                    }
                })
                if (!email) {
                    await db.usuarios.update(usuario, {
                        where: { idUsuario: idU }
                    })
                    return
                } else {
                    return 'Email já cadastrado'
                }
            }

            if (usuario.telefone) {
                const telefone = await db.usuarios.findOne({
                    where: {
                        telefone: usuario.telefone,
                        [Op.not]: [{ idUsuario: idU }]
                    }
                })

                if (!telefone) {
                    await db.usuarios.update(usuario, {
                        where: { idUsuario: idU }
                    })
                    return
                } else {
                    return 'Telefone já cadastrado'
                }
            }

            if (usuario.senha) {
                const senha = await db.usuarios.findOne({
                    where: {
                        senha: usuario.senha,
                        idUsuario: idU
                    }
                })

                if (senha) {
                    await db.usuarios.update(usuario.senha, {
                        where: { idUsuario: idU }
                    })
                    return
                } else {
                    return 'Senha incorreta'
                }
            }

            await db.usuarios.update(usuario, {
                where: { idUsuario: idU }
            })
            return

        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados');
        }
    }

}

module.exports = new UsuarioRepository()
