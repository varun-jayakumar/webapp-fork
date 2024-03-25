import logger from "../config/logger.js";
import { User } from "../models/index.js";

export const findOneByUsername = async (username) => {
  const user = await User.findOne({ where: { username: username } });
  return user;
};

export const doesUserAlreadyExist = async (username) => {
  const user = await findOneByUsername(username);
  if (user) return true;
  return false;
};

export const saveUser = async (
  username,
  password,
  firstName,
  lastName,
  accountCreated,
  accountUpdated
) => {
  try {
    let creationPayload = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      is_verificationEmail_sent: false,
      is_verified: false,
      verification_token: null,
      account_created: accountCreated,
      account_updated: accountUpdated,
    };
    const createdUser = await User.create(creationPayload);

    return createdUser;
  } catch (e) {
    logger.error("error while createing user", e);
  }
};

export const getUser = async (username) => {
  const user = await findOneByUsername(username);
  return user;
};

export const updateUser = async (updatePayload, username) => {
  try {
    await User.update(updatePayload, {
      where: {
        username: username,
      },
    });
  } catch (error) {
    console.error({ message: "error updating user", error: error });
  }
};

export const updateUserVerificationStatus = async (updatePayload, username) => {
  try {
    await User.update(updatePayload, {
      where: {
        username: username,
      },
    });
  } catch (error) {
    console.error({ message: "error updating user", error: error });
  }
};
