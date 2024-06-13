const Router = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const authenticateToken = require('../middlewares/authMiddleware')

const router = Router();

router.post('/cadastro', UsuarioController.cadastrar, () => {
    /*
        #swagger.tags = ['Usuário']
        #swagger.summary = 'Realizar o cadastro'
        #swagger.description = 'Usuário irá informar o nome, cpf, email e uma senha. A conta será criada se o cpf e o email não estiverem cadastrado.'
        #swagger.parameters['body'] = {
            in: 'body',                            
            description: '',                   
            required: true,                     
            type: 'object',
            schema: { 
                nome: 'string',
                cpf: 'string',
                email: 'string',
                senha: 'string'
            }
        }

        #swagger.responses[201] = { 
            description: 'A solicitação foi bem-sucedida e um novo recurso foi criado como resultado.'
        }
        #swagger.responses[409] = { 
            description: 'A solicitação não pôde ser processada devido a um conflito com o estado atual do recurso.'
        }
     */
});

router.post('/login', UsuarioController.login, () => {
    /*
        #swagger.tags = ['Usuário']
        #swagger.summary = 'Realizar o login'
        #swagger.description = 'Usuário irá informar o email e a senha. Se estiver correto o login será efetuado.'
        #swagger.parameters['body'] = {
            in: 'body',                            
            description: '',                   
            required: true,                     
            type: 'object',
            schema: {
                email: 'string',
                senha: 'string'
            }
        }
        #swagger.responses[200] = { 
            description: 'A solicitação foi bem-sucedida.',
            schema: {
                idUsuario: 0,
                nome: 'string',
                email: 'string',
                cpf: 'string',
                foto: 'string'
            }
        }
        #swagger.responses[401] = { 
            description: 'A solicitação requer autenticação do usuário.'
        }
     */
});

router.post('/login-token', authenticateToken, UsuarioController.loginToken, () => {

})

router.post('/recuperar', UsuarioController.recuperar, () => {
    /*
        #swagger.ignore = true
        #swagger.tags = ['Usuário']
        #swagger.summary = 'Recuperar senha'
        #swagger.description = 'Usuário irá informar o cpf. Se o cpf estiver cadastrado, irá mandar no email equivalente uma nova senha.'
        #swagger.parameters['body'] = {
            in: 'body',                            
            description: '',                   
            required: true,                     
            type: 'object',
            schema: {
                cpf: 'string'
            }
        }
        #swagger.responses[200] = { 
            description: 'A solicitação foi bem-sucedida.',
            schema: {
                nome: 'string'
                email: 'string'
            }
        }
        #swagger.responses[400] = { 
            description: 'A solicitação não pôde ser entendida ou está malformada.'
        }
     */
});

router.get('/:idU/usuario', authenticateToken, UsuarioController.usuarioInfo, () => {
    /*
        #swagger.tags = ['Usuário']
        #swagger.summary = 'Listar as informações do Usuário'
        #swagger.description = 'Após o login, irá listar nome, cpf, email, senha e a foto do usuário.'

        #swagger.responses[201] = { 
            description: 'A solicitação foi bem-sucedida e um novo recurso foi criado como resultado.'
        }
        #swagger.responses[409] = { 
            description: 'A solicitação não pôde ser processada devido a um conflito com o estado atual do recurso.'
        }
     */
})

router.put('/:idU/atualizar', authenticateToken, UsuarioController.atualizar, () => {
    /*
        #swagger.tags = ['Usuário']
        #swagger.summary = 'Atualizar dados'
        #swagger.description = 'Usuário irá atualizar o nome, email ou senha.'
        #swagger.parameters['body'] = {
            in: 'body',                            
            description: '',                   
            required: true,                     
            type: 'object',
            schema: {
                nome: 'string',
                email: 'string',
                senha: 'string'
            }
        }
        #swagger.responses[204] = { 
            description: 'A solicitação foi bem-sucedida, mas o servidor não está retornando nenhum conteúdo.'
        }
        #swagger.responses[409] = { 
            description: 'A solicitação não pôde ser processada devido a um conflito com o estado atual do recurso.'
        }
     */
})

module.exports = router;
