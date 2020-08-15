const bookingRouter = require("express").Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const BookingController = require("../controller/Booking");

bookingRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  BookingController.getAllBooking
);
bookingRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  BookingController.getSingleBooking
);

bookingRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  BookingController.addNewBooking
);
bookingRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  BookingController.deleteBooking
);
bookingRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  BookingController.deleteBooking
);

module.exports = bookingRouter;
