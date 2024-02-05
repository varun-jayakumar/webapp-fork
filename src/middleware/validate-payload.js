export const validatePayload = (app) => {
  app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400) {
      res.status(400).end();
    } else {
      next(error);
    }
  });
};
