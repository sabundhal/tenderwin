const express = require('express');
const sequelize = require('./config/database');
const tenderRoutes = require('./routes/tenderRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', tenderRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});


module.exports = app;
