const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');
const authMiddleware = require('../middleware/authMiddleware');




router.get('/tenders', authMiddleware, tenderController.getAllTenders);
router.post('/tenders', authMiddleware, tenderController.createTender);
router.get('/search', authMiddleware, tenderController.getTendersByParams);

module.exports = router;
