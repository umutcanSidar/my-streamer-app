const authRouter = require("./auth.router");

const authRoutes = (app) => {
  app.use(authRouter.routePrefix, authRouter.route());
};

module.exports = authRoutes;