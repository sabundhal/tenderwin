const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shortName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kpp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ogrn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  okato: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contacts: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'customers',
  timestamps: true,
});

module.exports = Customer;

