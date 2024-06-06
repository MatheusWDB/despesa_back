const Router = require('express');
const usuarioRoutes = require('./usuarioRoutes');
const despesaRoutes = require('./despesaRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger/swagger-output.json');

const router = Router();

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use(usuarioRoutes);
router.use(despesaRoutes);

module.exports = router;
