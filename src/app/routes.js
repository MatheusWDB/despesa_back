const Router = require('express')
const swaggerUi = require( 'swagger-ui-express')
const swaggerDocument = require( '../swagger/swagger-output.json')

const UsuarioController = require('./controllers/UsuarioController')
const DespesaController = require('./controllers/DespesaController')

const router = Router()

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.post('/cadastro', UsuarioController.cadastrar())
router.post('/login', UsuarioController.entrar())
router.post('/recupera-senha', UsuarioController.recuperar())


router.get('/dados/:idU', DespesaController)
router.post('/dados/:idU', DespesaController)
router.put('/dados/:idD', DespesaController)
router.delete('/dados/:idD', DespesaController)

module.exports = router
