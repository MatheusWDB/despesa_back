const Router = require('express')
const swaggerUi = require( 'swagger-ui-express')
const swaggerDocument = require( '../swagger/swagger-output.json')

const UsuarioController = require('./controllers/UsuarioController')
const DespesaController = require('./controllers/DespesaController')

const router = Router()

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.post('/cadastro', UsuarioController.cadastrar)
router.post('/login', UsuarioController.entrar)
router.post('/recupera-senha', UsuarioController.recuperar)

router.post('/:idU/adicionar', DespesaController.adicionar)
router.get('/:idU/listar', DespesaController.listar)
router.put('/:idD/atualizar', DespesaController.atualizar)
router.delete('/:idD/deletar', DespesaController.deletar)

module.exports = router
