const UsuarioRepository = require('../repositories/UsuarioRepository')
const jwtHelper = require('../utils/jwtHelper');

class UsuarioController {

    async cadastrar(req, res) {
        try {
            const cadastro = req.body
            console.log(cadastro)
            const resposta = await UsuarioRepository.cadastrar(cadastro)
            console.log(typeof resposta)

            if (typeof resposta === 'object') {
                return res.status(200).send('Cadastro realizado com sucesso!')
            }
            return res.status(401).send(resposta)

        } catch (error) {
            next(error);
        }
    }

    async entrar(req, res) {
        try {
            const login = req.body
            const resposta = await UsuarioRepository.entrar(login)
            console.log(resposta)
            if (typeof resposta !== 'string') {
                const token = jwtHelper.generateToken({ id: resposta.idUsuario });
                return res.status(200).json({ ...resposta, token })
            }
            res.status(401).send(resposta)

        } catch (error) {
            next(error);
        }
    }

    async recuperar(req, res) {
        try {
            const cpf = req.body

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new UsuarioController()
