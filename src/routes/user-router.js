import express from "express";
import { userController } from "../controller/index.js";
import { middlewares } from "../middleware/index.js";
import { method_not_allowed } from "./utility.js";

const userRouter = express.Router();
userRouter
  .route("/self")
  .get(
    [
      middlewares.requestLogger,
      middlewares.dbConnectionStatus,
      middlewares.authenticaiton,
    ],
    userController.getUserController
  );
userRouter
  .route("/self")
  .put(
    [
      middlewares.requestLogger,
      middlewares.dbConnectionStatus,
      middlewares.authenticaiton,
    ],
    userController.updateUserController
  );
userRouter
  .route("/")
  .post(
    middlewares.requestLogger,
    middlewares.dbConnectionStatus,
    userController.createUserController
  );
userRouter.route("/").all(middlewares.requestLogger, method_not_allowed);
userRouter.route("/self").all(middlewares.requestLogger, method_not_allowed);

export default userRouter;
