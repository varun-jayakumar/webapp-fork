import { sequelize } from "../config/database.js";

function hasQueryParams(url) {
  return url.includes("?");
}

export const health = async (req, res) => {
  if (
    req.headers["content-type"] ||
    (req.body && Object.keys(req.body).length !== 0) ||
    hasQueryParams(req.originalUrl)
  ) {
    res.status(400);
    res.set("cache-control", "no-cache").end();
  } else {
    try {
      await sequelize.authenticate();
      res.status(200);
      res.set("cache-control", "no-cache").end();
    } catch {
      res.status(503);
      res.set("cache-control", "no-cache").end();
    }
  }
};
