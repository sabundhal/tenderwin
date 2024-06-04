const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./Customer');

const Tender = sequelize.define('Tender', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tender_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tender_regNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tender_publishDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tender_endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tender_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tender_typeName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tender_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tender_beginPrice: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  tender_region: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tender_sourceLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tender_lotCategories: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tender_lotDeliveryPlacesText: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tender_lotDeliveryTerm: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tender_lotPreferences: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tender_jointBidding: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  tender_lotDeliveryKladrCodes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tender_lotCustomerContacts: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tender_summingUpDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tender_lotProductName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tender_sysPublishDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tender_sysUpdateDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tender_isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  tender_beginDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tender_lotRequirements: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tender_tag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tender_cancelReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'customers',
      key: 'id',
    },
    allowNull: true,
  }
}, {
  tableName: 'tenders',
  timestamps: true,
});

Tender.belongsTo(Customer, { foreignKey: 'customerId' });

module.exports = Tender;
