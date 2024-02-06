import mainRouter from "./main-router.js";
import userRouter from "./user-router.js";
export default (app) => {
  app.use("/", mainRouter);
  app.use("/v1/user", userRouter);
};
