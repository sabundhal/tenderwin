const Tender = require('../models/Tender');

exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await Tender.findAll();
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание нового тендера
exports.createTender = async (req, res) => {
  const { tender_id } = req.body;

  try {
    // Проверка наличия тендера с таким же tender_id
    const existingTender = await Tender.findOne({ where: { tender_id } });
    if (existingTender) {
      return res.status(400).json({ error: 'Tender with this tender_id already exists' });
    }

    const tender = await Tender.create(req.body);
    res.json(tender);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};