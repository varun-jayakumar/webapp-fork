const dbConnectionStatus = async (req, res, next) => {
  if (global.dbConnectionstatus) {
    next();
  } else {
    res.status(503);
    res.set("cache-control", "no-cache");
    res.end();
  }
};
export default dbConnectionStatus;
