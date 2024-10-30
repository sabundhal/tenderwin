const Log = require('../models/Log');

const logRequest = async (req, res, next) => {
  const startLog = {
    method: req.method,
    route: req.originalUrl,
    status: 'start',
    success: true,
    details: {
      headers: req.headers,
      body: req.body
    }
  };

  try {
    await Log.create(startLog);

    res.on('finish', async () => {
      const endLog = {
        method: req.method,
        route: req.originalUrl,
        status: 'end',
        success: res.statusCode < 400,
        error_message: res.statusCode >= 400 ? res.statusMessage : null,
        details: {
          headers: req.headers,
          body: req.body,
          response: res.statusCode
        }
      };

      await Log.create(endLog);
    });
  } catch (error) {
    console.error('Error logging request:', error);
  }

  next();
};

module.exports = logRequest;
