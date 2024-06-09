const UsuarioRepository = require('../repositories/UsuarioRepository')
const jwtHelper = require('../utils/jwtHelper');
const bcrypt = require('bcrypt');

class UsuarioController {

    async cadastrar(req, res) {
        const cadastro = req.body
        cadastro.senha = bcrypt.hashSync(req.body.senha, 8);
        const resposta = await UsuarioRepository.cadastrar(cadastro)
        if (typeof resposta === 'object') {
            return res.status(201).send('Cadastro realizado com sucesso!')
        }
        return res.status(400).send(resposta)
    }

    async login(req, res) {
        const login = req.body
        const token = false
        const resposta = await UsuarioRepository.login(login, token)
        if (typeof resposta !== 'string') {
            const token = jwtHelper.generateToken({ resposta });
            return res.status(200).json({ token })

        }
        res.status(401).send(resposta)
    }

    async loginToken(req, res) {
        const usuario = req.body
        const token = true
        await UsuarioRepository.login(usuario, token)
        res.status(200).end()
    }

    async usuarioInfo(req, res) {
        const idU = req.params.idU
        console.log(idU)
        const resposta = await UsuarioRepository.usuarioInfo(idU)
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
