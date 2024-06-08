const UsuarioRepository = require('../repositories/UsuarioRepository')
const jwtHelper = require('../utils/jwtHelper');

class UsuarioController {

    async cadastrar(req, res) {
        const cadastro = req.body
        const resposta = await UsuarioRepository.cadastrar(cadastro)
        if (typeof resposta === 'object') {
            return res.status(201).send('Cadastro realizado com sucesso!')
        }
        return res.status(400).send(resposta)
    }

    async entrar(req, res) {
        const login = req.body
        const resposta = await UsuarioRepository.entrar(login)
        if (typeof resposta === 'number') {
            const idU = resposta
            const token = jwtHelper.generateToken({ idU });
            return res.status(200).json({ idU })

        }
        res.status(401).send(resposta)
    }

    async usuario(req, res) {
        const idU = req.params.idU
        const resposta = await UsuarioRepository.usuario(idU)
        if (typeof resposta === 'string') {
            return res.status(400).send(resposta)
        } else {
            return res.status(200).json(resposta)
        }
    }

    async recuperar(req, res) {
        const cpf = req.body;
    }

    async atualizar(req, res) {
        const idU = req.params.idU
        const usuario = req.body
        const resposta = await UsuarioRepository.atualaizar(idU, usuario)
        if (!resposta) {
            return res.status(204).end()
        } else {
            return res.status(409).send(resposta)
        }
    }
}



module.exports = new UsuarioController()
