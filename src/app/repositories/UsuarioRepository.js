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
            const email = await db.usuarios.findOne({
                where: {
                    email: usuario.email,
                    [Op.not]: [{ idUsuario: idU }]
                }
            })
            if (!email) {
                const novoUsuario = await db.usuarios.update(usuario, {
                    where: { idUsuario: idU }
                })
                return
            } else {
                return 'Email já cadastrado'
            }

        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados');
        }
    }

}

module.exports = new UsuarioRepository()
