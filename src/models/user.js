import { DataTypes } from "sequelize";

const user_model = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  account_created: {
    type: DataTypes.STRING,
  },
  account_updated: {
    type: DataTypes.STRING,
  },
};

export default user_model;
