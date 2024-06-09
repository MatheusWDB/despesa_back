const jwtHelper = require('../utils/jwtHelper');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // Se não houver token, retorna 401 (Unauthorized)

    try {
        const user = jwtHelper.verifyToken(token);
        
        req.user = user; // Adiciona o usuário ao objeto de requisição
        next(); // Passa para o próximo middleware
    } catch (error) {
        res.status(403).json({ message: error.message }); // Retorna 403 (Forbidden) se o token for inválido
    }
};

module.exports = authenticateToken;
