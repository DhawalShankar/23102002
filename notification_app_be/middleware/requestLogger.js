// middleware/requestLogger.js

const requestLogger = (req, res, next) => {
  next();
};

export default requestLogger;