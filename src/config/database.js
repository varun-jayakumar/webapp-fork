import { Sequelize } from "sequelize";
import { setTimeout } from "timers/promises";
import defineAndValidateModels from "../models/index.js";
import logger from "./logger.js";
export let sequelize;
export let primaryConnection = new Sequelize(
  "postgres",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    post: process.env.DB_PORT,
    logging: false,
  }
);

const dbConnect = async () => {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "postgres",
      post: process.env.DB_PORT,
      logging: false,
    }
  );
  while (true) {
    try {
      await sequelize.authenticate();
      if (global.dbConnectionstatus == false) {
        if (process.env.NODE_ENV !== "test") logger.info("DB is connected now");
      }
      global.dbConnectionstatus = true;
      if (!global.areModelsInitialized) {
        defineAndValidateModels();
        global.areModelsInitialized = true;
      }
      await setTimeout(1000);
    } catch (error) {
      if (process.env.NODE_ENV !== "test") logger.warn("Waiting for DB...");
      global.dbConnectionstatus = false;
      await setTimeout(1000);
    }
  }
};

export const initializeDatabase = async () => {
  try {
    try {
      await primaryConnection.query(`CREATE DATABASE ${process.env.DB_NAME};`);
    } catch (error) {}
    primaryConnection.close();
  } catch (error) {
    logger.error({ message: "error creating DB", error: error });
  }
};

export default dbConnect;
