const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Ticket = require("../model/ticket");
const { ticketValidator } = require("../validators/validator");

module.exports = {
  getAllTicket: async (req, res) => {
    try {
      const route = await Ticket.find({});
      if (!route) {
        res.status(500).json({ message: "Ticket Not Found", error: true });
      }
      res.status(200).json(route);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  getSingleTicket: async (req, res) => {
    try {
      const route = await Ticket.findById({ _id: req.params.id });
      if (!route) {
        res.status(500).json({ message: "Ticket Not Found", error: true });
      }
      res.status(200).json(route);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  addNewTicket: async (req, res) => {
    try {
      const { error } = ticketValidator(req.body);
      if (error) {
        return res
          .status(400)
          .json({ message: error.details[0].message, error: true });
      }
      const newTicket = await new Ticket(req.body);
      const saveTicket = await newTicket.save();
      if (!saveTicket) {
        res.status(400).json({ message: "failed adding ticket", error: true });
      }
      res.status(200).json({ message: "Successfuly added", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  deleteTicket: async (req, res) => {
    try {
      const deleteTicket = await Ticket.findByIdAndDelete({
        _id: req.params.id,
      });
      if (!deleteTicket) {
        res
          .status(400)
          .json({ message: "failed Ticket deletion", error: true });
      }

      res.status(200).json({ message: "Successfuly deleted", error: false });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
  updateTicket: async (req, res) => {
    try {
      const updateTicket = await Ticket.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updateTicket) {
        res.status(400).json({ message: "failed Ticket update", error: true });
      }
      res.status(200).json({ message: "Successfuly updated", error: false });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: true });
    }
  },
};
