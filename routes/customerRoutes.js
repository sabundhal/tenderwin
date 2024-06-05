const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware'); // если у вас есть авторизация

router.post('/customers', authMiddleware, customerController.createCustomer);
router.get('/customers', authMiddleware, customerController.getAllCustomers);
module.exports = router;
