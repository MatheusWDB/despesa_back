const UsuarioRepository = require('./repositories/UsuarioRepository')

class UsuarioController {

    async cadastrar(req, res) {
        const cadastro = req.body
        console.log(cadastro)
        const resposta = await UsuarioRepository.cadastrar(cadastro)
        console.log(typeof resposta)

        if (typeof resposta === 'object') {
            return res.status(200).send('Cadastro realizado com sucesso!')
        }
        return res.status(401).send( resposta )
    }

    async entrar(req, res) {
        const login = req.body
        const resposta = await UsuarioRepository.entrar(login)
        console.log(resposta)
        if (typeof resposta !== 'string') {
            return res.status(200).json(resposta)
        }
        res.status(401).send(resposta)
    }

    async recuperar(req, res) {
        const cpf = req.body
    }

}

module.exports = new UsuarioController()
