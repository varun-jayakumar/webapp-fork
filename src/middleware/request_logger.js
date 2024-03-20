import logger from "../config/logger.js";

const requestLogger = async (req, res, next) => {
  logger.debug({
    reqMethod: req.method,
    reqURL: req.url,
    requestIP: req.socket.remoteAddress,
  });
  next();
};
export default requestLogger;
