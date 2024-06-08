const db = require('../database/models')
const { Op } = require('sequelize');

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

    async entrar(login) {
        try {
            const usuario = await db.usuarios.findOne({
                where: { email: login.email }
            })

            if (usuario) {
                if (login.senha === usuario.senha) {
                    return usuario.idUsuario
                } else {
                    return 'Senha incorreta!'
                }
            }
            return 'Email não cadastrado!'
        } catch (error) {
            console.error(error)
            throw new Error('Erro ao verificar os dados');
        }
    }

    async usuario(idU) {
        try {
            const usuario = await db.usuarios.findOne({
                attributes: ['nome', 'cpf', 'email', 'senha', 'foto'],
                where: {
                    idUsuario: idU,
                    deletado: 'F'
                }
            })
            if (!usuario) {
                return 'Essa conta foi deletada, para recuperar entre em contato.'
            }
            return usuario
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
