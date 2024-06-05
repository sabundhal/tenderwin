const express = require('express');
const router = express.Router();
const getFieldListController = require('../controllers/getFieldListController');
const authMiddleware = require('../middleware/authMiddleware'); // если у вас есть авторизация

// Маршрут для получения списка полей
router.get('/GetFieldList', authMiddleware, getFieldListController.getFieldList);

module.exports = router;
