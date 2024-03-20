import user_model from "./user.js";
import { sequelize } from "../config/database.js";
import logger from "../config/logger.js";

export let User;

export const initializeModels = () => {
  User = sequelize.define("User", user_model);
  if (process.env.NODE_ENV === "test") {
    User.sync({ force: true });
  } else {
    User.sync({ alter: true });
  }
};

const validateInitializtion = () => {
  if (User === sequelize.models.User) {
  } else {
    logger.error("table validation failed");
  }
};

const defineAndValidateModels = () => {
  initializeModels();
  validateInitializtion();
};

export default defineAndValidateModels;
