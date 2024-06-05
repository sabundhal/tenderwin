const Customer = require('../models/Customer');

// Создание нового клиента
exports.createCustomer = async (req, res) => {
  const { shortName, fullName, inn, ogrn, address, okato, contacts } = req.body;

  // Проверка обязательных полей
  if (!inn || !ogrn) {
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
    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Получение всех клиентов
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
