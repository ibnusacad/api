const driverRouter = require("express").Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const multer = require("multer");
const uploadImage = require("../uploadImage");
const DriverController = require("../controller/Driver");

driverRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  DriverController.getAllDriver
);
driverRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  DriverController.getSingleDriver
);

driverRouter.post(
  "/",
  uploadImage.uploader("./upload/licences/", "license"),
  passport.authenticate("jwt", { session: false }),
  DriverController.addNewDriver
);
driverRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  DriverController.deleteDriver
);
driverRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  DriverController.updateDriver
);

module.exports = driverRouter;
