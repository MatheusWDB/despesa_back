const db = require('../database/models')
const { Op } = require('sequelize');

class UsuarioRepository {

    async cadastrar(cadastro) {
        try {
            console.log(cadastro)
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
            console.log(error)
            throw new Error('Erro ao verificar os dados');
        }

    }

    async entrar(login) {
        const usuario = await db.usuarios.findOne({
            where: { email: login.email }
        })

        if (usuario) {
            if (login.senha === usuario.senha) {
                return { idUsuario: usuario.idUsuario, nome: usuario.nome, cpf: usuario.cpf, email: usuario.email, senha: usuario.senha, foto: usuario.foto}
            } else {
                return 'Senha incorreta!'
            }
        }
        return 'Email não cadastrado!'
    }

    async recuperar() {

    }

}

module.exports = new UsuarioRepository()
