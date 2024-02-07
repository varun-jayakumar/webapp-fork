import {
  saveUser,
  doesUserAlreadyExist,
  updateUser,
} from "../services/user-service.js";

import bcrypt from "bcrypt";
export const createUserController = async (req, res) => {
  let passwordHash;
  let accountCreated;
  const payload = req.body;

  if (!validateCreateUserPlayload(payload)) {
    res.status(400);
    res.set("cache-control", "no-cache").end();
    return;
  }

  const isExistingUser = await doesUserAlreadyExist(payload.username);
  if (isExistingUser) {
    res.status(400);
    res.set("cache-control", "no-cache").end();
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  passwordHash = bcrypt.hashSync(payload.password, salt);

  const currentDate = new Date();
  accountCreated = currentDate.toISOString();
  let accountUpdated = accountCreated;
  const createdUser = await saveUser(
    payload.username,
    passwordHash,
    payload.first_name,
    payload.last_name,
    accountCreated,
    accountUpdated
  );
  const createdUserData = createdUser.dataValues;
  res.status(201);
  res.set("cache-control", "no-cache");
  res.set("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      id: createdUserData.id,
      first_name: createdUserData.first_name,
      last_name: createdUserData.last_name,
      username: createdUserData.username,
      account_created: createdUserData.account_created,
      account_updated: createdUserData.account_updated,
    })
  );
  return;
};

export const updateUserController = async (req, res) => {
  let payload = req.body;
  if (validateUpdateUserPayload(payload)) {
    const currentDate = new Date().toISOString();
    let passwordHash;
    if (payload.password) {
      const salt = bcrypt.genSaltSync(10);
      passwordHash = bcrypt.hashSync(payload.password, salt);
    }
    let updatePayload = {
      ...(payload.first_name !== undefined && {
        first_name: payload.first_name,
      }),
      ...(payload.last_name !== undefined && { last_name: payload.last_name }),
      ...(payload.password !== undefined && { password: passwordHash }),
      ...(payload.password ||
        payload.first_name ||
        (payload.last_name && { account_updated: currentDate })),
    };
    await updateUser(updatePayload, res.locals.userData.username);
    res.status(204);
    res.set("cache-control", "no-cache").end();
    return;
  } else {
    res.status(400);
    res.set("cache-control", "no-cache").end();
    return;
  }
};

export const getUserController = async (req, res) => {
  let userData = res.locals.userData;
  res.status(200);
  res.set("cache-control", "no-cache");
  res.set("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      account_created: userData.account_created,
      account_updated: userData.account_updated,
    })
  );
  return;
};

const validateCreateUserPlayload = (payload) => {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (
    payload.first_name &&
    payload.last_name &&
    payload.password &&
    payload.username &&
    payload.username.match(mailformat)
  ) {
    if (Object.keys(payload).length == 4) return true;
    return false;
  } else {
    return false;
  }
};

const validateUpdateUserPayload = (payload) => {
  const allowedKeys = ["first_name", "last_name", "password", "username"];
  const presentKeys = Object.keys(payload);

  return (
    presentKeys.every((key) => allowedKeys.includes(key)) &&
    presentKeys.length > 0
  );
};
