import { validatePayload } from "./validate-payload.js";
import authenticaiton from "./authentication.js";
import dbConnectionStatus from "./db-connection-status.js";
const initializeMiddlewares = (app) => {
  validatePayload(app);
};

const middlewares = {
  authenticaiton: authenticaiton,
  dbConnectionStatus: dbConnectionStatus,
};

export default initializeMiddlewares;
export { middlewares };
