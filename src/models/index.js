import user_model from "./user.js";
import { sequelize } from "../config/database.js";

export let User;

const initializeModels = () => {
  User = sequelize.define("User", user_model);
  User.sync({ force: true });
};

const validateInitializtion = () => {
  if (User === sequelize.models.User) {
  } else {
    console.log("table validation failed");
  }
};

const defineAndValidateModels = () => {
  initializeModels();
  validateInitializtion();
};

export default defineAndValidateModels;
