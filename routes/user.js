const userRouter = require("express").Router();
const userController = require("../controller/User.js");
const passport = require("passport");
const passportConfig = require("../passport");
const multer = require("multer");
const uploadImage = require("../uploadImage");
const JWT = require("jsonwebtoken");

//All Users
userRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUSers
);
//register
userRouter.post("/register", userController.register);
//login
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  userController.login
);
//Logout
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  userController.logout
);
//User Profile
userRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.getSingleUSer
);

//Upload profile Picture
userRouter.patch(
  "/profilepicture",
  passport.authenticate("jwt", { session: false }),
  uploadImage.uploader("./upload/profile-pictures/", "profilePicture"),
  userController.userProfilePicture
);
userRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.userUpdate
);
userRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.userDelete
);

//User booking
userRouter.post(
  "/booking",
  passport.authenticate("jwt", { session: false }),
  userController.userBooking
);
//Get User Booking
userRouter.get(
  "/bookings",
  passport.authenticate("jwt", { session: false }),
  userController.getUSersBooking
);
//Admin
userRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  userController.Admin
);
//Is Authenticated
userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  userController.authenticated
);

module.exports = userRouter;
