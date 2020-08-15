const Joi = require("@hapi/joi");
const registerValidator = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).required().max(20),
    secondname: Joi.string().min(3).required().max(20),
    lastname: Joi.string().min(3).required().max(20),
    username: Joi.string().min(3).required().max(20),
    email: Joi.string().min(6).required().email().max(55),
    password: Joi.string().min(6).required().max(55),
    phoneNumber: Joi.number().min(7).max(15),
    roles: Joi.string().min(3).required().max(10),
  });
  return schema.validate(data);
};
const loginValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required().max(20),
    password: Joi.string().min(6).required().max(55),
  });
  return schema.validate(data);
};
const bookingValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(6).max(55),
    from: Joi.string().required().min(6).max(55),
    to: Joi.string().required().min(6).max(55),
    date: Joi.string().required().min(6).max(55),
    totalFare: Joi.number().required().min(1).max(55),
    status: Joi.string().required().min(6).max(55),
    seatNo: Joi.required(),
    departureTime: Joi.string().required().min(6).max(55),
    arrivalTime: Joi.string().required().min(6).max(55),
  });
  return schema.validate(data);
};
const routeValidator = (data) => {
  const schema = Joi.object({
    from: Joi.string().required().min(6).max(55),
    to: Joi.string().required().min(6).max(55),
    routes: Joi.required(),
  });
  return schema.validate(data);
};
const busValidator = (data) => {
  const schema = Joi.object({
    busNo: Joi.string().required(),
    model: Joi.string().required(),
    numberOfSeats: Joi.number().required(),
    driver: Joi.string().required(),
  });
  return schema.validate(data);
};
const ticketValidator = (data) => {
  const schema = Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required(),
    priceInShilling: Joi.number().required(),
    priceInDollar: Joi.number().required(),
  });
  return schema.validate(data);
};
const driverValidator = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().required().min(3),
    secondname: Joi.string().required().min(3),
    lastname: Joi.string().required().min(3),
    license: Joi.string().required(),
    busNo: Joi.string().required(),
    trips: Joi.number(),
  });
  return schema.validate(data);
};
module.exports = {
  registerValidator,
  loginValidator,
  bookingValidator,
  routeValidator,
  busValidator,
  ticketValidator,
  driverValidator,
};
