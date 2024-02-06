import { Sequelize } from "sequelize";
import { setTimeout } from "timers/promises";

export let sequelize;
const dbConnect = async () => {
  let isConnected = false;

  while (!isConnected) {
    try {
      sequelize = new Sequelize(
        process.env.LOCAL_DB_NAME,
        process.env.LOCAL_DB_USERNAME,
        process.env.LOCAL_DB_PASSWORD,
        {
          host: "localhost",
          dialect: "postgres",
          post: "5432",
          logging: false,
        }
      );
      await sequelize.authenticate();
      isConnected = true;
      console.log("connected to DB successfully");
    } catch (error) {
      console.log("Failed to connect to database, retying in 10 seconds...");
      await setTimeout(10000);
    }
  }
};

export default dbConnect;
