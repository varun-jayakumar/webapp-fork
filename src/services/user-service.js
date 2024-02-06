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
      account_created: accountCreated,
      account_updated: accountUpdated,
    };
    const createdUser = await User.create(creationPayload);

    return createdUser;
  } catch (e) {
    console.log("error while createing user", e);
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
    console.log(error);
  }
};
