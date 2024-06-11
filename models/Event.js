const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Подача заявок', 'Работа комиссии', 'Закупка завершена', 'Закупка отменена', 'Закупка приостановлена', 'Продление рассмотрения заявок', 'Продление срока подачи заявок', 'Отказ от заключения', 'Другие оповещения', 'Публикация разъяснений', 'Изменение статуса', 'Исполнение прекращено', 'Исполнение завершено', 'Аннулированные реестровые записи', 'Изменение даты проведения конкурса']]
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Event;
