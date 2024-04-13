import { middlewares } from "../middleware/index.js";
import mainRouter from "./main-router.js";
import userRouter from "./user-router.js";
export default (app) => {
  app.use("/", mainRouter);
  app.use("/v2/user", userRouter);
  app.all("*", middlewares.requestLogger, (req, res) => {
    res.status(404);
    res.set("cache-control", "no-cache").end();
  });
};
