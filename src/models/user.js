import { DataTypes } from "sequelize";

const user_model = {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_created: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_updated: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verification_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_verificationEmail_sent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  token_valid_until: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

export default user_model;
