const UsuarioRepository = require('../repositories/UsuarioRepository')
const jwtHelper = require('../utils/jwtHelper');
const bcrypt = require('bcrypt')
const transporter = require('../utils/nodemailer')
require('dotenv').config()

class UsuarioController {

    async cadastrar(req, res) {
        const body = req.body
        body.cadastro.senha = bcrypt.hashSync(body.cadastro.senha, 8)
        const resposta = await UsuarioRepository.cadastrar(body)
        if (!resposta) {
            return res.status(201).send('Cadastro realizado com sucesso!')
        }
        res.status(400).send(resposta)
    }

    async login(req, res) {
        const login = req.body
        const resposta = await UsuarioRepository.login(login)
        if (typeof resposta !== 'string') {
            const token = jwtHelper.generateToken({ resposta });
            return res.status(200).json({ token })
        }
        res.status(401).send(resposta)
    }

    async loginToken(req, res) {
        const login = req.body
        await UsuarioRepository.login(login)
        res.status(200).end()
    }

    async usuarioInfo(req, res) {
        const idU = req.params.idU
        const resposta = await UsuarioRepository.usuarioInfo(idU)
        if (typeof resposta === 'string') {
            return res.status(400).send(resposta)
        } else {
            if (resposta.foto) {
                resposta.foto = resposta.foto.toString()
            }
            return res.status(200).json(resposta)
        }
    }

    async recuperar(req, res) {
        const cpf = req.body;
        const resposta = await UsuarioRepository.verificar(cpf)
        if (!resposta) {
            return res.status(400).send('CPF não cadastrado')
        } 
        const novaSenha = 1234        
        transporter.sendMail({
            from: process.env.USEREMAIL,
            to: resposta.email,
            subject: "Assunto do E-mail",
            text: `Corpo do e-mail em texto plano ${novaSenha}`,
        }).then(info => {
            res.status(200).json(info)
        }).catch(error => {
            console.error(error)
            res.status(400).json(error)
        })
    }

    async atualizar(req, res) {
        const idU = req.params.idU
        const usuario = req.body
        console.log(usuario)
        if (usuario.usuario.novaSenha) {
            usuario.usuario.novaSenha = bcrypt.hashSync(usuario.usuario.novaSenha, 8)
        }
        const resposta = await UsuarioRepository.atualaizar(idU, usuario)
        if (!resposta) {
            return res.status(204).end()
        }
        return res.status(409).send(resposta)

    }
}



module.exports = new UsuarioController()
