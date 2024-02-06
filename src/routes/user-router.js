import express from "express";
import { userController } from "../controller/index.js";
import { middlewares } from "../middleware/index.js";
import { method_not_allowed } from "./utility.js";

const userRouter = express.Router();
userRouter
  .route("/self")
  .get(middlewares.authenticaiton, userController.getUserController);
userRouter
  .route("/self")
  .put(middlewares.authenticaiton, userController.updateUserController);
userRouter.route("/").post(userController.createUserController);

export default userRouter;
