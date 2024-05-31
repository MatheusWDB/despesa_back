const UsuarioRepository = require('./repositories/UsuarioRepository')

class UsuarioController {

    async cadastrar(req, res) {
        const cadastro = req.body
        const resposta = UsuarioRepository.cadastrar(cadastro)

        if (typeof resposta === 'object') {
            return res.status(200).send('Cadastro realizado com sucesso!')
        }
        res.status(400).send(resposta)
    }

    async entrar(req, res) {
        const login = req.body
        const resposta = await UsuarioRepository.entrar(login)
        console.log(resposta)
        if (typeof resposta === 'number') {
            return res.status(200).json({ idUsuario: resposta })
        }
        res.status(401).send(resposta)
    }

    async recuperar(req, res) {
        const cpf = req.body
    }

}

module.exports = new UsuarioController()
