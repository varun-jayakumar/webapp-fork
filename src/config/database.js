import { Sequelize } from "sequelize";

export let sequelize;
const dbConnect = async () => {
  try {
    sequelize = new Sequelize(process.env.LOCAL_DB_CONNECTION_STRING);
    await sequelize.authenticate();
  } catch (error) {}
};

export default dbConnect;
