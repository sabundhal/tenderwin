const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');
const authMiddleware = require('../middleware/authMiddleware');
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
 *     Tender:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID тендера
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания тендера
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата последнего обновления тендера
 *       example:
 *         id: 1
 *         createdAt: 2024-06-01T10:00:00Z
 *         updatedAt: 2024-06-02T15:00:00Z
 */

/**
 * @swagger
 * /api/tenders:
 *   get:
 *     summary: Получить список тендеров
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
 *         description: Список тендеров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tender'
 *           application/xml:
 *             schema:
 *               type: string
 *               example: "<tenders><tender><id>1</id><name>Tender 1</name>...</tender></tenders>"
 */


router.get('/tenders', authMiddleware, tenderController.getAllTenders);

/**
 * @swagger
 * /api/tenders/{id}:
 *   get:
 *     summary: Получить тендер по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID тендера
 *     responses:
 *       200:
 *         description: Тендер найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tender'
 *       404:
 *         description: Тендер не найден
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tender:
 *       type: object
 *       properties:
 *         tender_id:
 *           type: integer
 *           description: Уникальный идентификатор тендера
 *         tender_regNumber:
 *           type: string
 *           description: Регистрационный номер тендера
 *         tender_publishDate:
 *           type: string
 *           format: date-time
 *           description: Дата публикации тендера
 *         tender_endDate:
 *           type: string
 *           format: date-time
 *           description: Дата окончания тендера
 *         tender_name:
 *           type: string
 *           description: Название тендера
 *         tender_typeName:
 *           type: string
 *           description: Тип тендера
 *         tender_status:
 *           type: string
 *           description: Статус тендера
 *         tender_beginPrice:
 *           type: number
 *           description: Начальная цена тендера
 *         tender_region:
 *           type: string
 *           description: Регион тендера
 *         tender_sourceLink:
 *           type: string
 *           description: Ссылка на источник тендера
 *         tender_lotCategories:
 *           type: string
 *           description: Категории лотов тендера
 *         tender_lotDeliveryPlacesText:
 *           type: string
 *           description: Текст о местах доставки лотов тендера
 *         tender_lotDeliveryTerm:
 *           type: string
 *           description: Условия доставки лотов тендера
 *         tender_lotPreferences:
 *           type: string
 *           description: Предпочтения по лотам тендера
 *         tender_jointBidding:
 *           type: boolean
 *           description: Объединенные ставки на тендер
 *         tender_lotDeliveryKladrCodes:
 *           type: string
 *           description: Коды КЛАДР для доставки лотов тендера
 *         tender_lotCustomerContacts:
 *           type: string
 *           description: Контакты заказчика лотов тендера
 *         tender_summingUpDate:
 *           type: string
 *           format: date-time
 *           description: Дата подведения итогов тендера
 *         tender_lotProductName:
 *           type: string
 *           description: Название продукта лотов тендера
 *         tender_sysPublishDate:
 *           type: string
 *           format: date-time
 *           description: Дата публикации системой
 *         tender_sysUpdateDate:
 *           type: string
 *           format: date-time
 *           description: Дата последнего обновления системой
 *         tender_isCompleted:
 *           type: boolean
 *           description: Статус завершения тендера
 *         tender_beginDate:
 *           type: string
 *           format: date-time
 *           description: Дата начала тендера
 *         tender_lotRequirements:
 *           type: string
 *           description: Требования к лотам тендера
 *         tender_tag:
 *           type: string
 *           description: Тег тендера
 *         tender_cancelReason:
 *           type: string
 *           description: Причина отмены тендера
 *         customerId:
 *           type: integer
 *           description: ID клиента, связанного с тендером
 *       example:
 *         tender_id: 1
 *         tender_regNumber: "12345"
 *         tender_publishDate: "2024-06-15T10:00:00Z"
 *         tender_endDate: "2024-06-30T23:59:59Z"
 *         tender_name: "Тендер 1"
 *         tender_typeName: "Открытый конкурс"
 *         tender_status: "Активный"
 *         tender_beginPrice: 100000
 *         tender_region: "Москва"
 *         tender_sourceLink: "http://example.com/tender"
 *         tender_sysPublishDate: "2024-06-15T10:00:00Z"
 *         tender_sysUpdateDate: "2024-06-15T10:00:00Z"
 *         tender_isCompleted: false
 *         tender_beginDate: "2024-07-01T00:00:00Z"
 *         customerId: 1
 */


/**
 * @swagger
 * /api/tenders:
 *   post:
 *     summary: Создать новый тендер
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tender'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/Tender'
 *     responses:
 *       201:
 *         description: Тендер создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tender'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Tender'
 */

router.post('/tenders', authMiddleware, tenderController.createTender);

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Поиск тендеров по параметрам
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ids
 *         required: false
 *         schema:
 *           type: string
 *         description: Список ID тендеров через запятую
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *         description: Статус тендера
 *       - in: query
 *         name: beginDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Дата начала тендера
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Дата окончания тендера
 *       - in: query
 *         name: sysUpdateDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Дата последнего обновления тендера
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *         description: Формат ответа (json или xml)
 *     responses:
 *       200:
 *         description: Список найденных тендеров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tender'
 *           application/xml:
 *             schema:
 *               type: string
 *               example: "<tenders><tender><id>1</id><name>Tender 1</name>...</tender></tenders>"
 */

router.get('/search', authMiddleware, tenderController.getTendersByParams);

/**
 * @swagger
 * /api/tenders/{id}:
 *   put:
 *     summary: Обновить тендер
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID тендера
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tender'
 *     responses:
 *       200:
 *         description: Тендер обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tender'
 *       404:
 *         description: Тендер не найден
 */

/**
 * @swagger
 * /api/tenders/{id}:
 *   delete:
 *     summary: Удалить тендер
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID тендера
 *     responses:
 *       204:
 *         description: Тендер удален
 *       404:
 *         description: Тендер не найден
 */
module.exports = router;
