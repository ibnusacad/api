const ticketRouter = require("express").Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const TicketController = require("../controller/Ticket");

ticketRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  TicketController.getAllTicket
);
ticketRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TicketController.getSingleTicket
);

ticketRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  TicketController.addNewTicket
);
ticketRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TicketController.deleteTicket
);
ticketRouter.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TicketController.updateTicket
);

module.exports = ticketRouter;
