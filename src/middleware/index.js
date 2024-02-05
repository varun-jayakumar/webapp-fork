import { validatePayload } from "./validate-payload.js";

const initializeMiddlewares = (app) => {
  validatePayload(app);
};

export default initializeMiddlewares;
