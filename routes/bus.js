const busRouter = require("express").Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const BusController = require("../controller/Bus");

busRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  BusController.getAllBus
);
busRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  BusController.getSingleBus
);

busRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  BusController.addNewBus
);
busRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  BusController.deleteBus
);
busRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  BusController.updateBus
);

module.exports = busRouter;
