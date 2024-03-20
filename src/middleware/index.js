import { validatePayload } from "./validate-payload.js";
import authenticaiton from "./authentication.js";
import dbConnectionStatus from "./db-connection-status.js";
import requestLogger from "./request_logger.js";

const initializeMiddlewares = (app) => {
  validatePayload(app);
};

const middlewares = {
  requestLogger: requestLogger,
  authenticaiton: authenticaiton,
  dbConnectionStatus: dbConnectionStatus,
};

export default initializeMiddlewares;
export { middlewares };
