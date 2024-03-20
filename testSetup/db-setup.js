import { Sequelize } from "sequelize";
import { setTimeout } from "timers/promises";
import { sequelize } from "../src/config/database.js";
import logger from "../src/config/logger.js";

// check if connection is available before running tests
export const waitForDbToInitialize = async () => {
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

export const dropDatabaseAfterTest = async () => {
  sequelize.close();
  const primaryConnection = new Sequelize(
    "postgres",
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
      post: process.env.DB_PORT,
      logging: false,
    }
  );
  try {
    await primaryConnection.query(`DROP DATABASE ${process.env.DB_NAME};`);
  } catch (e) {
    logger.error({ message: "error dropping DB", error: e });
  }
};
