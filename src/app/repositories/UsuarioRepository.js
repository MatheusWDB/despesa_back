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
                    return { idUsuario: usuario.idUsuario, nome: usuario.nome, cpf: usuario.cpf, email: usuario.email, senha: usuario.senha, foto: usuario.foto }
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
