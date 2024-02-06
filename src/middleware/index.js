import { validatePayload } from "./validate-payload.js";
import authenticaiton from "./authentication.js";
const initializeMiddlewares = (app) => {
  validatePayload(app);
};

const middlewares = { authenticaiton: authenticaiton };

export default initializeMiddlewares;
export { middlewares };
