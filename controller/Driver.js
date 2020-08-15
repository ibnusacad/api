const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Driver = require("../model/driver");
const { driverValidator } = require("../validators/validator");
const bus = require("../model/bus");

module.exports = {
  getAllDriver: async (req, res) => {
    try {
      const driver = await Driver.find({});
      if (!driver) {
        res.status(500).json({ message: "Driver Not Found", error: true });
      }
      res.status(200).json(driver);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  getSingleDriver: async (req, res) => {
    try {
      const driver = await Driver.findById({ _id: req.params.id });
      if (!driver) {
        res.status(500).json({ message: "Driver Not Found", error: true });
      }
      res.status(200).json(driver);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  addNewDriver: async (req, res) => {
    try {
      const { error } = driverValidator(req.body);
      if (error) {
        return res
          .status(400)
          .json({ message: error.details[0].message, error: true });
      }
      const { firstname, secondname, lastname, busNo } = req.body;
      const newDriver = await new Driver({
        firstname: firstname,
        secondname: secondname,
        lastname: lastname,
        license: req.file.filename,
        busNo: busNo,
      });
      const saveDriver = await newDriver.save();
      if (!saveDriver) {
        res.status(400).json({ message: "failed adding driver", error: true });
      }
      res.status(200).json({ message: "Successfuly added", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  deleteDriver: async (req, res) => {
    try {
      const deleteDriver = await Driver.findByIdAndDelete({
        _id: req.params.id,
      });
      if (!deleteDriver) {
        res
          .status(400)
          .json({ message: "failed Driver deletion", error: true });
      }

      res.status(200).json({ message: "Successfuly deleted", error: false });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  updateDriver: async (req, res) => {
    try {
      const updateDriver = await Driver.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updateDriver) {
        res.status(400).json({ message: "failed Driver update", error: true });
      }
      res.status(200).json({ message: "Successfuly updated", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
};
