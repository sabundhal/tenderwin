const Customer = require('../models/Customer');

// Создание нового клиента
const convertToXml = (customer) => {
  return `<customer>
    <id>${customer.id}</id>
    <shortName>${customer.shortName}</shortName>
    <fullName>${customer.fullName}</fullName>
    <inn>${customer.inn}</inn>
    <ogrn>${customer.ogrn}</ogrn>
    <address>${customer.address}</address>
    <okato>${customer.okato}</okato>
    <contacts>${customer.contacts}</contacts>
  </customer>`;
};

exports.createCustomer = async (req, res) => {
  const { shortName, fullName, inn, ogrn, address, okato, contacts } = req.body;

  // Проверка обязательных полей
  if (req.headers['content-type'] === 'application/json' && (!inn || !ogrn)) {
    return res.status(400).json({ error: 'INN and OGRN are required' });
  }

  try {
    // Проверка наличия клиента с таким же INN и OGRN
    const existingCustomer = await Customer.findOne({ where: { inn, ogrn } });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer with this INN and OGRN already exists' });
    }

    // Создание нового клиента
    const customer = await Customer.create({ shortName, fullName, inn, ogrn, address, okato, contacts });

    const { format } = req.query;

    if (format === 'xml') {
      res.set('Content-Type', 'application/xml');
      return res.send(`<?xml version="1.0" encoding="UTF-8"?><customer>${convertToXml(customer)}</customer>`);
    } else {
      return res.status(201).json(customer);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Получение всех клиентов
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    const { format } = req.query;

    if (format === 'xml') {
      let xmlResponse = '<?xml version="1.0" encoding="UTF-8"?><customers>';
      customers.forEach(customer => {
        xmlResponse += `<customer>
          <id>${customer.id}</id>
          <shortName>${customer.shortName}</shortName>
          <fullName>${customer.fullName}</fullName>
          <inn>${customer.inn}</inn>
          <kpp>${customer.kpp}</kpp>
          <ogrn>${customer.ogrn}</ogrn>
          <address>${customer.address}</address>
          <okato>${customer.okato}</okato>
          <contacts>${customer.contacts}</contacts>
        </customer>`;
      });
      xmlResponse += '</customers>';
      res.set('Content-Type', 'application/xml');
      return res.send(xmlResponse);
    } else {
      res.json(customers);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};