export const method_not_allowed = (req, res) => {
  res.status(405);
  res.set("cache-control", "no-cache").end();
};
