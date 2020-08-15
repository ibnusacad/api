const passport = require("passport");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    return (token = req.cookies["access_token"]);
  }
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById({ _id: payload.sub });
        if (user) {
          return done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false);
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  })
);
