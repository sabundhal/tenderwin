const express = require('express');
const sequelize = require('./config/database');
const tenderRoutes = require('./routes/tenderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const getFieldListRoutes = require('./routes/getFieldListRoutes');
const eventRoutes = require('./routes/eventRoutes');
const populateCustomers = require('./seeders/customerSeeder'); 
const populateTenders = require('./seeders/tenderSeeder');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');


require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', tenderRoutes);
app.use('/api', customerRoutes);
app.use('/api', getFieldListRoutes);
app.use(eventRoutes);
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


sequelize.sync().then(async () => {
  console.log('Database connected');

  // Вызываем скрипт сеялки для заполнения таблицы данными
  await populateCustomers(10);
  await populateTenders(20);
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});


module.exports = app;
