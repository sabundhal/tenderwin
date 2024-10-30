const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Log extends Model {}

Log.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  route: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  success: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  error_message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  details: {
    type: DataTypes.JSONB,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Log',
  tableName: 'logs',
  timestamps: false,
});

module.exports = Log;
