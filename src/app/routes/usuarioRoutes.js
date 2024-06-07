const Router = require('express');
const UsuarioController = require('../controllers/UsuarioController');

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
        #swagger.responses[400] = { 
            description: 'A solicitação não pôde ser entendida ou está malformada.'
        }
     */
});


router.post('/login', UsuarioController.entrar, () => {
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

module.exports = router;
