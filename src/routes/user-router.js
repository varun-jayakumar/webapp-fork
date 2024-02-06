import express from "express";
import { userController } from "../controller/index.js";
import { middlewares } from "../middleware/index.js";

const userRouter = express.Router();
userRouter
  .route("/self")
  .get(
    [middlewares.dbConnectionStatus, middlewares.authenticaiton],
    userController.getUserController
  );
userRouter
  .route("/self")
  .put(
    [middlewares.dbConnectionStatus, middlewares.authenticaiton],
    userController.updateUserController
  );
userRouter
  .route("/")
  .post(middlewares.dbConnectionStatus, userController.createUserController);

export default userRouter;
