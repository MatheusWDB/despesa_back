const db = require('../../db/models')
const { Op } = require('sequelize');

class UsuarioRepository {

    async cadastrar(cadastro) {
        try {
            const [newCadastro, criado] = await db.usuarios.findOrCreate({
                where: {
                    cpf: cadastro.cpf,
                    email: cadastro.email
                },
                defaults: cadastro
            })

            return criado
                ? newCadastro
                : 'Email ou cpf já cadastrado!'
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao verificar os dados');
        }

    }

    async entrar(login) {
        const usuario = await db.usuarios.findOne({
            where: {
                [Op.or]: [
                    {email: login.login},
                    {cpf: login.login}
                ]
            }
        })

        if (usuario) {
            if (login.senha === usuario.senha) {
                return usuario.idUsuario
            } else {
                return 'Senha incorreta!'
            }
        }
        return 'CPF ou email não cadastrado!'
    }

    async recuperar() {

    }

}

module.exports = new UsuarioRepository()
