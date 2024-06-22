const express = require('express');
const router = express.Router();
const getFieldListController = require('../controllers/getFieldListController');
const authMiddleware = require('../middleware/authMiddleware'); // если у вас есть авторизация

// Маршрут для получения списка полей
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Field:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID поля
 *         name:
 *           type: string
 *           description: Имя поля
 *         type:
 *           type: string
 *           description: Тип поля
 *       example:
 *         id: 1
 *         name: Поле1
 *         type: string
 */

/**
 * @swagger
 * /api/GetFieldList:
 *   get:
 *     summary: Получить список полей
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: entity
 *         schema:
 *           type: string
 *         description: Тип сущности (tender, customer, или event)
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *         description: Формат ответа (json или xml)
 *     responses:
 *       200:
 *         description: Список полей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Field'
 *           application/xml:
 *             schema:
 *               type: string
 *               example: "<fields><field>field1</field><field>field2</field></fields>"
 *       401:
 *         description: Не авторизован
 */

router.get('/GetFieldList', authMiddleware, getFieldListController.getFieldList);

module.exports = router;
