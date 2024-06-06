const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Despesa',
    description: 'Gerenciador de depesas'
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routes = ['../app/routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
