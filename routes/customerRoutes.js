const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware'); // если у вас есть авторизация
const js2xmlparser = require('js2xmlparser'); // Пакет для конвертации JSON в XML
const logRequest = require('../middleware/logRequest');


router.use(logRequest);

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
 *     Customer:
 *       type: object
 *       required:
 *         - shortName
 *         - fullName
 *         - inn
 *         - ogrn
 *         - address
 *         - okato
 *         - contacts
 *       properties:
 *         shortName:
 *           type: string
 *           description: Краткое наименование клиента
 *         fullName:
 *           type: string
 *           description: Полное наименование клиента
 *         inn:
 *           type: string
 *           description: ИНН клиента
 *         ogrn:
 *           type: string
 *           description: ОГРН клиента
 *         address:
 *           type: string
 *           description: Адрес клиента
 *         okato:
 *           type: string
 *           description: ОКАТО клиента
 *         contacts:
 *           type: string
 *           description: Контактные данные клиента
 *       example:
 *         shortName: Short Name
 *         fullName: Full Name
 *         inn: "331234567890"
 *         ogrn: "331234567890123"
 *         address: Address
 *         okato: "12345678"
 *         contacts: Contact details
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Создать нового клиента
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Клиент создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       401:
 *         description: Не авторизован
 */

router.post('/customers', authMiddleware, customerController.createCustomer);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Получить список клиентов
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *         description: Формат ответа (json или xml)
 *     responses:
 *       200:
 *         description: Список клиентов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *           application/xml:
 *             schema:
 *               type: string
 *               example: "<customers><customer><id>1</id><shortName>ShortName</shortName>...</customer></customers>"
 *       401:
 *         description: Не авторизован
 */
router.get('/customers', authMiddleware, customerController.getAllCustomers);
module.exports = router;
