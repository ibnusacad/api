const User = require("../model/user");
const Booking = require("../model/booking");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportConfig = require("../passport");
const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();

const {
  registerValidator,
  loginValidator,
  bookingValidator,
} = require("../validators/validator");

module.exports.getAllUSers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (e) {
    res
      .status(404)
      .json({ message: { msgBody: "user not found", msgError: true } });
  }
};
module.exports.userUpdate = async (req, res) => {};
module.exports.userDelete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    if (user)
      res
        .status(200)
        .json({ message: { msgBody: "successfuly deleted", msgError: false } });
    res
      .status(500)
      .json({ message: { msgBody: "operation failed", msgError: true } });
  } catch (error) {
    res
      .status(500)
      .json({ message: { msgBody: "something went wrong", msgError: true } });
  }
};
module.exports.register = async (req, res) => {
  try {
    const { error } = registerValidator(req.body);
    if (error) {
      console.log(error.details[0].message);
      return res
        .status(400)
        .json({
          message: { msgBody: error.details[0].message, msgError: true },
        });
    }

    const { firstname, lastname, username, email, password, roles } = req.body;
    const users = await User.findOne({ username: username });
    if (users) {
      return res
        .status(400)
        .json({ message: { msgBody: "username is taken", msgError: true } });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User(req.body);
    const saveUser = await user.save();
    if (saveUser) {
      return res
        .status(201)
        .json({ message: { msgBody: "user is registered", msgError: false } });
    } else {
      return res
        .status(400)
        .json({
          message: { msgBody: "user is not registered", msgError: false },
        });
    }
  } catch (e) {
    return res
      .status(500)
      .json({
        message: { msgBody: ` something went wronge)`, msgError: true },
      });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const { error } = loginValidator(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: { msgBody: error.details[0].message, msgError: true } });
  }
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res
        .status(404)
        .json({ message: { msgBody: "User is not exist", msgError: true } });
    const { username, role } = user;
    if (req.isAuthenticated()) {
      const token = jwt.sign(
        { iss: "transport", sub: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    } else {
      return res
        .status(401)
        .json({ message: { msgBody: "something went wrong", msgError: true } });
    }
  } catch (e) {
    return res
      .status(401)
      .json({ message: { msgBody: "something went wrong", msgError: true } });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.json({
    user: { username: "", role: "" },
    success: true,
  });
};
module.exports.getSingleUSer = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: { msgBody: "something went wrong", msgError: true } });
  }
};
module.exports.userProfilePicture = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.user._id },
      { $set: { profilePicture: req.file.filename } }
    );
    if (user)
      res
        .status(200)
        .json({
          message: { msgBody: "profile picture uploaded", msgError: false },
        });
    else
      res
        .status(500)
        .json({ message: { msgBody: "something went wrong", msgError: true } });
  } catch (error) {
    res
      .status(500)
      .json({ message: { msgBody: "something went wrong", msgError: true } });
  }
};
module.exports.userBooking = async (req, res) => {
  try {
    const { error } = bookingValidator(req.body);
    if (error) {
      return res
        .status(400)
        .json({
          message: { msgBody: error.details[0].message, msgError: true },
        });
    }
    const booking = await new Booking(req.body);
    const book = await booking.save();
    if (!book) {
      return res.status(500).json({
        message: { msgBody: "Your Booking is failed", msgError: true },
      });
    } else {
      req.user.bookings.push(booking);
      const userBook = await req.user.save();
      if (!userBook) {
        return res.status(500).json({
          message: { msgBody: "Your Booking is failed", msgError: true },
        });
      } else {
        res.status(200).json({
          message: { msgBody: "Successfully booked", msgError: false },
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: {
        msgBody: "something went wrong",

        msgError: true,
      },
    });
  }
};
module.exports.getUSersBooking = (req, res) => {
  User.findById({ _id: req.user._id })
    .populate("booking")
    .exec((err, doc) => {
      if (err) {
        return res.status(500).json({
          message: { msgBody: "something went wrong", msgError: true },
        });
      } else {
        res.status(200).json({ bookings: doc.bookings, authenticated: true });
      }
    });
};
module.exports.Admin = (req, res) => {
  if (req.user.roles === "admin") {
    res
      .status(200)
      .json({
        message: { msgBody: { msgBody: "you are an admin", msgError: false } },
      });
  } else {
    res
      .status(403)
      .json({
        message: { msgBody: { msgBody: "you are not ad,im", msgError: true } },
      });
  }
};
module.exports.authenticated = (req, res) => {
  const { username, roles } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { usename, roles } });
};
