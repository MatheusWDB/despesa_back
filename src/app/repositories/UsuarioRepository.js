const db = require('../database/models')
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class UsuarioRepository {

    async cadastrar(cadastro) {
        try {
            const [newCadastro, criado] = await db.usuarios.findOrCreate({
                where: {
                    [Op.or]: [
                        { cpf: cadastro.cpf },
                        { email: cadastro.email }
                    ]

                },
                defaults: cadastro
            })

            return criado
                ? newCadastro
                : 'Email ou cpf já cadastrado!'
        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados');
        }

    }

    async login(login, token) {
        try {
            const usuario = await db.usuarios.findOne({
                attributes: ['idUsuario', 'email', 'senha'],
                where: {
                    email: login.email,
                    deletado: 'F'
                }
            })

            if (usuario) {
                if (token) {
                    const verificarSenha = bcrypt.compareSync(login.senha, usuario.senha);
                    if (verificarSenha) {
                        return usuario
                    } else {
                        return 'Senha incorreta!'
                    }
                } else {
                    return 
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
                attributes: ['nome', 'cpf', 'email', 'foto']
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
