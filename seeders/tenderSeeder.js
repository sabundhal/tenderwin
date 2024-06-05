const { faker } = require('@faker-js/faker');
const Tender = require('../models/Tender'); // Подключаем модель данных тендера
const Customer = require('../models/Customer'); // Подключаем модель данных заказчика

// Функция для создания фиктивных данных тендера
function generateTenderData() {
    return {
        tender_regNumber: faker.datatype.uuid(),
        tender_publishDate: faker.date.past(),
        tender_endDate: faker.date.future(),
        tender_name: faker.commerce.productName(),
        tender_typeName: faker.company.name(),
        tender_status: faker.helpers.arrayElement(['Published', 'Completed', 'Cancelled']),
        tender_beginPrice: faker.finance.amount(),
        tender_region: faker.address.state(),
        tender_sourceLink: faker.internet.url(),
        tender_lotCategories: faker.commerce.department(),
        tender_lotDeliveryPlacesText: faker.address.streetAddress(),
        tender_lotDeliveryTerm: faker.lorem.sentence(),
        tender_lotPreferences: faker.lorem.sentence(),
        tender_jointBidding: faker.datatype.boolean(),
        tender_lotDeliveryKladrCodes: faker.address.zipCode(),
        tender_lotCustomerContacts: faker.phone.number(),
        tender_summingUpDate: faker.date.future(),
        tender_lotProductName: faker.commerce.productName(),
        tender_sysPublishDate: faker.date.recent(),
        tender_sysUpdateDate: faker.date.recent(),
        tender_isCompleted: faker.datatype.boolean(),
        tender_beginDate: faker.date.past(),
        tender_lotRequirements: faker.lorem.sentence(),
        tender_tag: faker.random.word(),
        tender_cancelReason: faker.lorem.sentence(),
        customerId: faker.datatype.number({ min: 1, max: 10 }) // Предполагаем, что у вас есть 10 заказчиков в базе данных
    };
}

// Функция для заполнения таблицы данными
async function populateTenders(numTenders) {
    try {
        // Генерируем и добавляем данные тендеров в таблицу
        for (let i = 0; i < numTenders; i++) {
            const tenderData = generateTenderData();
            await Tender.create(tenderData);
        }
        console.log(`Successfully populated ${numTenders} tenders.`);
    } catch (error) {
        console.error('Error populating tenders:', error);
    }
}

// Экспортируем функцию для использования в других местах
module.exports = populateTenders;
