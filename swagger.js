const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'The Video Store API',
    description: 'The Video Store API'
  },
  host: 'cse341-w2024-team3.onrender.com',
  schemes: [
    'https'
]
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endpointsFile, doc);