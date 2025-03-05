const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
//const User = require('../models/user.model');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      console.error('User not found for ID:', payload.sub);
      return done(null, false);
    }
    console.log('User authenticated:', user);
    done(null, user);
  } catch (error) {
    console.error('JWT verification error:', error);
    done(error, false)
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
