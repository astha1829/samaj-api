const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config.js');
const Token = require('../model/token.model');

const generateToken = async (user, expiresIn, type, secret = config.jwt.secret) => {
  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(expiresIn, 'minutes').unix(),
    type
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type
  });
  return tokenDoc;
};

const generateAuthTokens = async (user, type) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = await generateToken(user, config.jwt.accessExpirationMinutes, type);
    
  
    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = await generateToken(user, config.jwt.refreshExpirationDays * 24 * 60, 'refresh');
  
  
    await saveToken(refreshToken, user.id, refreshTokenExpires, 'refresh');
  
    return { accessToken, refreshToken };
  };
  

module.exports = {
  generateAuthTokens
};
