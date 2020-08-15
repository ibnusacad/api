const routeRouter = require("express").Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const RouteController = require("../controller/Route");

routeRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  RouteController.getAllRoute
);
routeRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  RouteController.getSingleRoute
);

routeRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  RouteController.addNewRoute
);
routeRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  RouteController.deleteRoute
);
routeRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  RouteController.updateRoute
);

module.exports = routeRouter;
