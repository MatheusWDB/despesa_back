const Router = require('express');
const DespesaController = require('../controllers/DespesaController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = Router();

router.post('/:idU/adicionar', DespesaController.adicionar, () => {
    /*
        #swagger.tags = ['Despesa']
        #swagger.summary = 'Adiciona despesa'
        #swagger.description = 'Usuário irá adicionar uma nova despesa contedo valor, origem e, se quiser, uma descrição.'
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
        #swagger.responses[201] = { 
            description: 'A solicitação foi bem-sucedida e um novo recurso foi criado.'
        }
*/
})
router.get('/:idU/listar', DespesaController.listar, () => {
    /*
        #swagger.tags = ['Despesa']
        #swagger.summary = 'Lista as despesas'
        #swagger.description = 'Será listadas todas as despesas do usuário contendo o id, a descrição, valor, origem, data e a situação se está pago ou não.'
        #swagger.responses[200] = { 
            description: 'A solicitação foi bem-sucedida e o servidor retornou os dados solicitados.',
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
*/
})
router.put('/:idD/atualizar', DespesaController.atualizar, () => {
    /*
        #swagger.tags = ['Despesa']
        #swagger.summary = 'Atualizar despesa'
        #swagger.description = 'Usuário irá atualizar a descrição, valor ou origem da despesa especificada.'
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

        #swagger.responses[204] = { 
            description: 'A solicitação foi bem-sucedida, mas o servidor não está retornando nenhum conteúdo.'
        }
        }
*/
})
router.put('/:idD/deletar', DespesaController.deletar, () => {
    /*
        #swagger.tags = ['Despesa']
        #swagger.summary = 'Deletar despesa'
        #swagger.description = 'Usuário irá deletar a despesa especificada.'
        #swagger.responses[204] = { 
            description: 'A solicitação foi bem-sucedida, mas o servidor não está retornando nenhum conteúdo.'
        }
*/
})

module.exports = router;
