const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
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
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - date
 *       properties:
 *         id:
 *           type: integer
 *           description: ID события
 *         name:
 *           type: string
 *           description: Описание события
 *         date:
 *           type: string
 *           format: date-time
 *           description: Дата и время возникновения события
 *       example:
 *         id: 1
 *         name: Подача заявок
 *         date: 2024-06-03T10:15:30Z
 */


/**
 * @swagger
 * /api/tenders/{id}/events:
 *   get:
 *     summary: Получить события тендера
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID тендера
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *         description: Формат ответа (json или xml)
 *     responses:
 *       200:
 *         description: Список событий тендера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: integer
 *                 createDate:
 *                   type: string
 *                   format: date-time
 *                 lastUpdateDate:
 *                   type: string
 *                   format: date-time
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *           application/xml:
 *             schema:
 *               type: string
 *               example: "<events><event><id>1</id><createDate>2024-06-01T10:00:00Z</createDate>...</event></events>"
 *       404:
 *         description: Tender not found
 */

router.get('/api/tenders/:id/events', eventController.getTenderEvents);

/**
 * @swagger
 * /api/tenders/{id}/events:
 *   post:
 *     summary: Добавить событие к тендеру
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
 *             $ref: '#/components/schemas/Event'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Событие создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Tender not found
 */

router.post('/api/tenders/:id/events', eventController.addTenderEvent);



module.exports = router;
