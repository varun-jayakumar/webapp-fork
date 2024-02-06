import express from "express";
import { healthController } from "../controller/index.js";
import { method_not_allowed } from "./utility.js";

const mainRouter = express.Router();
mainRouter.route("/healthz").get(healthController.health);
mainRouter.route("/healthz").all(method_not_allowed);
// mainRouter.get("*", (req, res) => {
//   res.status(404);
//   res.set("cache-control", "no-cache").end();
// });

export default mainRouter;
