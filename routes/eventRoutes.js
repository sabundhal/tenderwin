const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/api/tenders/:id/events', eventController.getTenderEvents);
router.post('/api/tenders/:id/events', eventController.addTenderEvent);

module.exports = router;
