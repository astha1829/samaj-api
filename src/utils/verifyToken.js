const jwt = require('jsonwebtoken');
const AdminModel = require('../model/admin.model');
const { JWT_SECRET } = process.env;

const verifyToken = async (token, userId, tokenVersion) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await AdminModel.findById(userId);
    if (!user || decoded.version !== user.tokenVersion || tokenVersion !== user.tokenVersion) {
      throw new Error('Invalid token');
    }

    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

module.exports = verifyToken;