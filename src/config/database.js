import { Sequelize } from "sequelize";
import { setTimeout } from "timers/promises";
import defineAndValidateModels from "../models/index.js";
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    post: process.env.DB_PORT,
    logging: false,
  }
);
const dbConnect = async () => {
  while (true) {
    try {
      await sequelize.authenticate();
      global.dbConnectionstatus = true;
      if (!areModelsInitialized) {
        defineAndValidateModels();
        global.areModelsInitialized = true;
      }
      await setTimeout(1000);
    } catch (error) {
      global.dbConnectionstatus = false;
      await setTimeout(5000);
    }
  }
};

export default dbConnect;
