import { userService } from "../services/index.js";
import bcrypt from "bcrypt";

const authenticaiton = async (req, res, next) => {
  if (req.headers.authorization) {
    var encoded = req.headers.authorization.split(" ")[1];
    var decoded = new Buffer(encoded, "base64").toString();
    var username = decoded.split(":")[0];
    var passwordplain = decoded.split(":")[1];

    if (await userService.doesUserAlreadyExist(username)) {
      let user = await userService.findOneByUsername(username);
      let userData = user.dataValues;
      let passwordHash = userData.password;
      let isPasswordValid = bcrypt.compareSync(passwordplain, passwordHash);

      if (isPasswordValid) {
        res.locals.userData = userData;
        next();
      } else {
        res.status(401);
        res.set("cache-control", "no-cache");
        res.end();
      }
    } else {
      res.status(401);
      res.set("cache-control", "no-cache").end();
    }
  } else {
    res.status(401);
    res.set("cache-control", "no-cache").end();
  }
};

export default authenticaiton;
