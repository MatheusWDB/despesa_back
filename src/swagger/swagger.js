const swaggerAutogen = require('swagger-autogen')(options);

const options = {
  openapi: "3.0.0",     // Enable/Disable OpenAPI.                        By default is null
  language: 'pt-BR',     // Change response language.                      By default is 'en-US'
  disableLogs: false,    // Enable/Disable logs.                           By default is false
  autoHeaders: true,    // Enable/Disable automatic headers recognition.  By default is true
  autoQuery: true,    // Enable/Disable automatic query recognition.    By default is true
  autoBody: true,    // Enable/Disable automatic body recognition.     By default is true
  writeOutputFile: true      // Enable/Disable writing the output file.        By default is true
};

const doc = {
  info: {
    version: '',            // by default: '1.0.0'
    title: 'Despesa',              // by default: 'REST API'
    description: 'Gereciador de depesas'         // by default: ''
  },
  servers: [
    {
      url: 'http://localhost:3000',              // by default: 'http://localhost:3000'
      description: ''       // by default: ''
    },
    // { ... }
  ],
  tags: [                   // by default: empty Array
    {
      name: '',             // Tag name
      description: ''       // Tag description
    },
    // { ... }
  ],
  components: {}            // by default: empty object
};

const outputFile = './swagger-output.json';
const routes = ['./path/userRoutes.js', './path/bookRoutes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
