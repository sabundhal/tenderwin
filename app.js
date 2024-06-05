const express = require('express');
const sequelize = require('./config/database');
const tenderRoutes = require('./routes/tenderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const getFieldListRoutes = require('./routes/getFieldListRoutes');
const populateCustomers = require('./seeders/customerSeeder'); 
const populateTenders = require('./seeders/tenderSeeder');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', tenderRoutes);
app.use('/api', customerRoutes);
app.use('/api', getFieldListRoutes);

sequelize.sync().then(async () => {
  console.log('Database connected');

  // Вызываем скрипт сеялки для заполнения таблицы данными
  await populateCustomers(10);
  await populateTenders(20);
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});


module.exports = app;
