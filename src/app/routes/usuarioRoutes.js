const Router = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = Router();


router.post('/cadastro', UsuarioController.cadastrar, () => {
    /*
        #swagger.tags = ['Usuário']
        #swagger.summary = 'Realizar o cadastro'
        #swagger.description = ''
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

        #swagger.responses[200] = { 
            description: 'User registered successfully.'
        }
        #swagger.responses[401] = { 
            description: 'Server failure.'
        }
     */
});


router.post('/login', UsuarioController.entrar, () => {
    /*
        #swagger.tags = ['Usuário']
        #swagger.summary = 'Realizar o login'
        #swagger.description = ''
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
            description: 'User registered successfully.',
            schema: {
                idUsuario: 0,
                nome: 'string',
                email: 'string',
                cpf: 'string',
                foto: 'string'
            }
        }
        #swagger.responses[401] = { 
            description: 'Server failure.'
        }
     */
});

router.post('/recuperar', UsuarioController.recuperar, () => {
    /*
        #swagger.ignore = true
        #swagger.tags = ['Usuário']
        #swagger.summary = 'Recuperar senha'
        #swagger.description = ''
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
            description: 'User registered successfully.',
            schema: {
                nome: 'string'
                email: 'string'
            }
        }
        #swagger.responses[401] = { 
            description: 'Server failure.'
        }
     */
});

module.exports = router;
