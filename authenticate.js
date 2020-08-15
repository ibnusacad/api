const jwt = require("jsonwebtoken");

module.exports = function authenticate(req, res, next) {
  let token = null;
  if (req && req.cookies) token = req.cookies["access_token"];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username) => {
    if (err) res.sendStatus(401);
    req.user = username;
    next();
  });
  res.sendStatus(401);
};
