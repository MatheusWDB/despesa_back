const Router = require('express');
const DespesaController = require('../controllers/DespesaController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = Router();

router.post('/:idU/adicionar', DespesaController.adicionar, () => {
    /*
        #swagger.tags = ['Despesa']
        #swagger.summary = 'Adiciona despesa'
        #swagger.description = ''
        #swagger.parameters['body'] = {
            in: 'body',                            
            description: '',                   
            required: true,                     
            type: 'object',
            schema: { 
                descricao: 'string',
                valor: 0,
                origem: 'string',
            }
        }
        #swagger.responses[200] = { 
            description: 'User registered successfully.'
        }
*/
})
router.get('/:idU/listar', DespesaController.listar, () => {
    /*
        #swagger.tags = ['Despesa']
        #swagger.summary = 'Lista as despesas'
        #swagger.description = ''
        #swagger.responses[200] = { 
            description: 'User registered successfully.',
            schema: [
                {
                    idDespesa: 0,
                    descrincao: 'string',
                    valor: 'string',
                    origem: 'string',
                    ano: 'string',
                    mes: 'string',
                    dia: 'string',
                    pago: 'string'
                }
            ]
        }
        #swagger.responses[401] = { 
            description: 'Server failure.'
        }
*/
})
router.put('/:idD/atualizar', DespesaController.atualizar, () => {
    /*
        #swagger.tags = ['Despesa']
        #swagger.summary = 'Atualizar despesa'
        #swagger.description = ''
        #swagger.parameters['body'] = {
            in: 'body',                            
            description: '',                   
            required: true,                     
            type: 'object',
            schema: { 
                descrincao: 'string',
                valor: 'string',
                origem: 'string'
            }
        }

        #swagger.responses[200] = { 
            description: 'User registered successfully.'
        }
        #swagger.responses[401] = { 
            description: 'Server failure.'
        }
*/
})
router.put('/:idD/deletar', DespesaController.deletar, () => {
    /*
        #swagger.tags = ['Despesa']
        #swagger.summary = 'Deletar despesa'
        #swagger.description = ''
        #swagger.responses[200] = { 
            description: 'User registered successfully.'
        }
        #swagger.responses[401] = { 
            description: 'Server failure.'
        }
*/
})

module.exports = router;
