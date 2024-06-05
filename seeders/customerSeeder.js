const { faker } = require('@faker-js/faker');
const Customer = require('../models/Customer'); // Подключаем модель данных заказчика

// Функция для создания фиктивных данных заказчика
function generateCustomerData() {
    return {
        shortName: faker.company.name(),
        fullName: faker.company.name(),
        inn: faker.datatype.number({ min: 1000000000, max: 9999999999 }).toString(),
        kpp: faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
        ogrn: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
        address: faker.address.streetAddress(),
        okato: faker.datatype.number({ min: 10000000000, max: 99999999999 }).toString(),
        contacts: faker.lorem.sentence()
    };
}

// Функция для заполнения таблицы данными
async function populateCustomers(numCustomers) {
    try {
        // Генерируем и добавляем данные заказчиков в таблицу
        for (let i = 0; i < numCustomers; i++) {
            const customerData = generateCustomerData();
            await Customer.create(customerData);
        }
        console.log(`Successfully populated ${numCustomers} customers.`);
    } catch (error) {
        console.error('Error populating customers:', error);
    }
}

// Экспортируем функцию для использования в других местах
module.exports = populateCustomers;
