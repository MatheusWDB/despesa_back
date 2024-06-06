const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro para depuração

    const status = err.status || 500;
    const message = err.message || 'Erro interno no servidor';

    res.status(status).json({
        error: {
            message,
            status,
        },
    });
};

module.exports = errorHandler;
