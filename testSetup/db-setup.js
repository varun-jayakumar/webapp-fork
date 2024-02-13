import { Sequelize } from "sequelize";
import { setTimeout } from "timers/promises";
import initializeModels from "../src/models/index.js";

// check if connection is available before running tests
const waitForDbToInitialize = async () => {
  let sequelize;
  while (true) {
    try {
      sequelize = new Sequelize(
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
      await sequelize.authenticate();
      sequelize.close();
      await setTimeout(1000);
      if (global.dbConnectionstatus && global.areModelsInitialized) break;
    } catch (e) {
      await setTimeout(2000);
    }
  }
  return;
};

export const clearTablesBeforeEachTest = async () => {
  initializeModels();
};

export default waitForDbToInitialize;
