const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Booking = require("../model/booking");
const { bookingValidator } = require("../validators/validator");

module.exports = {
  getAllBooking: async (req, res) => {
    try {
      const booking = await Booking.find({});
      if (!booking) {
        res.status(500).json({ message: "Booking Not Found", error: true });
      }
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  getSingleBooking: async (req, res) => {
    try {
      const booking = await Booking.findById({ _id: req.params.id });
      if (!booking) {
        res.status(500).json({ message: "Booking Not Found", error: true });
      }
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  addNewBooking: async (req, res) => {
    try {
      const { error } = bookingValidator(req.body);
      if (error) {
        return res
          .status(400)
          .json({ message: error.details[0].message, error: true });
      }
      const newBooking = await new Booking(req.body);
      const saveBooking = await newBooking.save();
      if (!saveBooking) {
        res.status(400).json({ message: "failed booking", error: true });
      }
      res.status(200).json({ message: "Successfuly booked", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  deleteBooking: async (req, res) => {
    try {
      const deleteBooking = await Booking.findByIdAndDelete({
        _id: req.params.id,
      });
      if (!deleteBooking) {
        res
          .status(400)
          .json({ message: "failed Booking deletion", error: true });
      }

      res.status(200).json({ message: "Successfuly deleted", error: false });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  updateBooking: async (req, res) => {
    try {
      const updateBooking = await Booking.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updateBooking) {
        res.status(400).json({ message: "failed Booking update", error: true });
      }
      res.status(200).json({ message: "Successfuly updated", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
};
