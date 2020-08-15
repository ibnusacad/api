const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Bus = require("../model/bus");
const { busValidator } = require("../validators/validator");

module.exports = {
  getAllBus: async (req, res) => {
    try {
      const route = await Bus.find({});
      if (!route) {
        res.status(500).json({ message: "Bus Not Found", error: true });
      }
      res.status(200).json(route);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  getSingleBus: async (req, res) => {
    try {
      const route = await Bus.findById({ _id: req.params.id });
      if (!route) {
        res.status(500).json({ message: "Bus Not Found", error: true });
      }
      res.status(200).json(route);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  addNewBus: async (req, res) => {
    try {
      const { error } = busValidator(req.body);
      if (error) {
        return res
          .status(400)
          .json({ message: error.details[0].message, error: true });
      }
      const newBus = await new Bus(req.body);
      const saveBus = await newBus.save();
      if (!saveBus) {
        res.status(400).json({ message: "failed adding bus", error: true });
      }
      res.status(200).json({ message: "Successfuly added", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  deleteBus: async (req, res) => {
    try {
      const deleteBus = await Bus.findByIdAndDelete({
        _id: req.params.id,
      });
      if (!deleteBus) {
        res.status(400).json({ message: "failed Bus deletion", error: true });
      }

      res.status(200).json({ message: "Successfuly deleted", error: false });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  updateBus: async (req, res) => {
    try {
      const updateBus = await Bus.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updateBus) {
        res.status(400).json({ message: "failed Bus update", error: true });
      }
      res.status(200).json({ message: "Successfuly updated", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
};
