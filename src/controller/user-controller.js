import {
  saveUser,
  doesUserAlreadyExist,
  updateUser,
  getUser,
  findOneByUsername,
} from "../services/user-service.js";
import { publishMessage } from "../services/pubSub-service.js";
import bcrypt from "bcrypt";
import logger from "../config/logger.js";

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
  await publishMessage(createdUser.username);

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
  const username = res.locals.username;
  const userData = getUser(username);
  let payload = req.body;
  if (validateUpdateUserPayload(payload)) {
    const currentDate = new Date().toISOString();
    let passwordHash;
    if (payload.password) {
      const salt = bcrypt.genSaltSync(10);
      passwordHash = bcrypt.hashSync(payload.password, salt);
    }
    let updatePayload = {
      ...userData,
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

export const verifyUserController = async (req, res) => {
  const token = req.query.token;
  const username = req.query.username;
  if (username && token) {
    const userData = await findOneByUsername(username);
    if (!userData) {
      logger.info({ message: "no such user" });
      logger.info({ message: "responding with 400" });
      res.status(400);
      res.set("Content-Type", "text/html");
      res.set("cache-control", "no-cache").end();
      res.send("<h1>Invalid link</h1> <p>The link is invalid</p>").end();
      return;
    }
    if (userData.is_verified) {
      res.status(200);
      res.set("Content-Type", "text/html");
      res.set("cache-control", "no-cache");
      res.send("<h1>User already verified</h1>").end();
      return;
    }
    try {
      const now = new Date();
      if (userData.verification_token === token) {
        if (userData.token_valid_until > now) {
          await updateUser({ ...userData, is_verified: true }, username);
          logger.info("Token validation successful : user verified");
          logger.info("responding with 200");
          res.status(200);
          res.set("Content-Type", "text/html");
          res.set("cache-control", "no-cache");
          res
            .send(
              "<h1>Email verification successful</h1> <p>user verified successfully</p>"
            )
            .end();
          return;
        } else {
          logger.warn({
            message: `token Expired now:${now} | validity: ${userData.token_valid_until}`,
          });
          logger.info({ message: "responding with 401" });
          res.status(401);
          res.set("Content-Type", "text/html");
          res.set("cache-control", "no-cache");
          res
            .send(
              "<h1>Link Expired!</h1> <p>The verification link is expired</p>"
            )
            .end();
        }
      } else {
        logger.warn({ message: "token mismatch" });
        logger.info({ message: "responding with 400" });
        res.status(400);
        res.set("Content-Type", "text/html");
        res.set("cache-control", "no-cache");
        res.send("<h1>Invalid link</h1> <p>The link is invalid</p>").end();
        return;
      }
    } catch (e) {
      logger.error(e);
      return;
    }
  } else {
    logger.info({ message: "request Missing username or email" });
    logger.info({ message: "responding with 400" });
    res.status(400);
    res.set("Content-Type", "text/html");
    res.set("cache-control", "no-cache");
    res.send("<h1>Invalid link</h1> <p>The link is invalid</p>").end();
    return;
  }
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
    return true;
  } else {
    return false;
  }
};

const validateUpdateUserPayload = (payload) => {
  const allowedKeys = ["first_name", "last_name", "password"];
  const presentKeys = Object.keys(payload);

  return (
    presentKeys.every((key) => allowedKeys.includes(key)) &&
    presentKeys.length > 0
  );
};
