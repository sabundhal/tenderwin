// controllers/tenderController.js

const Tender = require('../models/Tender');
const { Op } = require('sequelize');

const validStatuses = ['active', 'closed', 'pending', 'cancelled'];

exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await Tender.findAll();
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTender = async (req, res) => {
  const { tender_regNumber, tender_publishDate, tender_endDate, tender_name, tender_typeName, tender_status, tender_lotCustomerShortName, tender_lotCustomerFullName, tender_lotCustomerInn, tender_lotCustomerKpp, tender_lotCustomerOgrn, tender_beginPrice, tender_region, tender_sourceLink, tender_lotCategories, tender_lotDeliveryPlacesText, tender_lotDeliveryTerm, tender_lotPreferences, tender_jointBidding, tender_lotDeliveryKladrCodes, tender_lotCustomerContacts, tender_summingUpDate, tender_lotProductName, tender_sysPublishDate, tender_sysUpdateDate, tender_isCompleted, tender_cancelReason, tender_tag, tender_lotRequirements } = req.body;

  try {
    const tender = await Tender.create({
      tender_regNumber,
      tender_publishDate,
      tender_endDate,
      tender_name,
      tender_typeName,
      tender_status,
      tender_lotCustomerShortName,
      tender_lotCustomerFullName,
      tender_lotCustomerInn,
      tender_lotCustomerKpp,
      tender_lotCustomerOgrn,
      tender_beginPrice,
      tender_region,
      tender_sourceLink,
      tender_lotCategories,
      tender_lotDeliveryPlacesText,
      tender_lotDeliveryTerm,
      tender_lotPreferences,
      tender_jointBidding,
      tender_lotDeliveryKladrCodes,
      tender_lotCustomerContacts,
      tender_summingUpDate,
      tender_lotProductName,
      tender_sysPublishDate,
      tender_sysUpdateDate,
      tender_isCompleted,
      tender_cancelReason,
      tender_tag,
      tender_lotRequirements
    });
    res.status(201).json(tender);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTendersByParams = async (req, res) => {
  const { ids, tender_status, tender_beginDate_from, tender_beginDate_to, tender_endDate_from, tender_endDate_to, tender_sysUpdateDate_from, tender_sysUpdateDate_to } = req.query;

  const whereClause = {};

  if (ids) {
    const idArray = ids.split(',').map(id => id.trim()).slice(0, 50);
    whereClause.tender_id = { [Op.in]: idArray };
  }

  if (tender_status) {
    if (!validStatuses.includes(tender_status)) {
      return res.status(400).json({ error: `Invalid tender status. Valid statuses are: ${validStatuses.join(', ')}` });
    }
    whereClause.tender_status = tender_status;
  }

  if (tender_beginDate_from || tender_beginDate_to) {
    whereClause.tender_beginDate = {};
    if (tender_beginDate_from) whereClause.tender_beginDate[Op.gte] = new Date(tender_beginDate_from);
    if (tender_beginDate_to) whereClause.tender_beginDate[Op.lte] = new Date(tender_beginDate_to);
  }

  if (tender_endDate_from || tender_endDate_to) {
    whereClause.tender_endDate = {};
    if (tender_endDate_from) whereClause.tender_endDate[Op.gte] = new Date(tender_endDate_from);
    if (tender_endDate_to) whereClause.tender_endDate[Op.lte] = new Date(tender_endDate_to);
  }

  if (tender_sysUpdateDate_from || tender_sysUpdateDate_to) {
    whereClause.tender_sysUpdateDate = {};
    if (tender_sysUpdateDate_from) whereClause.tender_sysUpdateDate[Op.gte] = new Date(tender_sysUpdateDate_from);
    if (tender_sysUpdateDate_to) whereClause.tender_sysUpdateDate[Op.lte] = new Date(tender_sysUpdateDate_to);
  }

  try {
    const tenders = await Tender.findAll({ where: whereClause });
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
