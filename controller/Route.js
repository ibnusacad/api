const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Route = require("../model/route");
const { routeValidator } = require("../validators/validator");

module.exports = {
  getAllRoute: async (req, res) => {
    try {
      const route = await Route.find({});
      if (!route) {
        res.status(500).json({ message: "Route Not Found", error: true });
      }
      res.status(200).json(route);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  getSingleRoute: async (req, res) => {
    try {
      const route = await Route.findById({ _id: req.params.id });
      if (!route) {
        res.status(500).json({ message: "Route Not Found", error: true });
      }
      res.status(200).json(route);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  addNewRoute: async (req, res) => {
    try {
      const { error } = routeValidator(req.body);
      if (error) {
        return res
          .status(400)
          .json({ message: error.details[0].message, error: true });
      }
      const newRoute = await new Route(req.body);
      const saveRoute = await newRoute.save();
      if (!saveRoute) {
        res.status(400).json({ message: "failed adding route", error: true });
      }
      res.status(200).json({ message: "Successfuly added", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  deleteRoute: async (req, res) => {
    try {
      const deleteRoute = await Route.findByIdAndDelete({
        _id: req.params.id,
      });
      if (!deleteRoute) {
        res.status(400).json({ message: "failed Route deletion", error: true });
      }

      res.status(200).json({ message: "Successfuly deleted", error: false });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  updateRoute: async (req, res) => {
    try {
      const updateRoute = await Route.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updateRoute) {
        res.status(400).json({ message: "failed Route update", error: true });
      }
      res.status(200).json({ message: "Successfuly updated", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
};
