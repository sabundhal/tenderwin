const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TenderWin API',
      version: '1.0.0',
      description: 'API документация для TenderWin',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // Путь к файлам с документированными маршрутами
};

const specs = swaggerJsdoc(options);

module.exports = specs;
