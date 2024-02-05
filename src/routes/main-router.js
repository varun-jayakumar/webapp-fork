import express from "express";
import { healthCheck } from "../controller/index.js";
const mainRouter = express.Router();

const method_not_allowed = (req, res) => {
  res.status(405);
  res.set("cache-control", "no-cache").end();
};
mainRouter.route("/healthz").get(healthCheck.health);
mainRouter.route("/healthz").all(method_not_allowed);

export default mainRouter;
