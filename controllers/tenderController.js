const Tender = require('../models/Tender');

exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await Tender.findAll();
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTender = async (req, res) => {
  try {
    const tender = await Tender.create(req.body);
    res.json(tender);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
