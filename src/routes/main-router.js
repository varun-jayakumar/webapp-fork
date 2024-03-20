import express from "express";
import { healthController } from "../controller/index.js";
import { method_not_allowed } from "./utility.js";
import { middlewares } from "../middleware/index.js";

const mainRouter = express.Router();
mainRouter
  .route("/healthz")
  .get(middlewares.requestLogger, healthController.health);
mainRouter.route("/healthz").all(middlewares.requestLogger, method_not_allowed);

export default mainRouter;
