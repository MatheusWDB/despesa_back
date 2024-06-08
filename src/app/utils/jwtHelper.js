const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.SECRET || 'your-secret-key'; // Certifique-se de definir SECRET no seu arquivo .env

// Função para gerar um token
const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

// Função para verificar um token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
