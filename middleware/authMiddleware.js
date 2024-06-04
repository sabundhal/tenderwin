// authMiddleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const hardcodedToken = '1111-1111-1111-1111';

module.exports = function (req, res, next) {
  const tokenHeader = req.header('Authorization');

  if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = tokenHeader.replace('Bearer ', '');

  // Если токен совпадает с захардкоженным токеном, допустить доступ
  if (token === hardcodedToken) {
    req.user = { id: 'ваш_идентификатор_пользователя' }; // Устанавливаем информацию о пользователе
    next();
  } else {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
