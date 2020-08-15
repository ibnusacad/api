const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const UserRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const bookingRouter = require("./routes/booking");
const routeRouter = require("./routes/route");
const driverRouter = require("./routes/driver");
const busRouter = require("./routes/bus");
const ticketRouter = require("./routes/ticket");

const app = express();
app.use(cors());
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET));
const PORT = process.env.PORT || 5000;
//Database Connection
mongoose.connect(
  process.env.URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log("database error", err);
    console.log("Database Connected");
  }
);
//Routes
app.get("/api", (req, res) => {
  res.send("hello guest");
});
//images
app.use("/upload", express.static(path.join(__dirname, "upload")));
// User Routes
app.use("/api/users", UserRouter);
//Booking Routes
app.use("/api/booking", bookingRouter);
//Route Routes
app.use("/api/route", routeRouter);
// Driver Routes
app.use("/api/users", driverRouter);
//Bus Routes
app.use("/api/booking", busRouter);
//Ticket Routes
app.use("/api/route", ticketRouter);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
