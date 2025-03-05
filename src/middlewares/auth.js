const httpStatus = require('http-status');
const { ApiError } = require('../utils/ApiError'); // Make sure to destructure ApiError properly
const AdminModel = require('../model/admin.model');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'No token provided');
    }

    // Remove 'Bearer ' prefix from token
    const tokenWithoutBearer = token.replace('Bearer ', '');

    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    console.log('Decoded Token:', decoded);

    if (!decoded.sub || decoded.type !== 'admin') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token payload');
    }

    const admin = await AdminModel.findById(decoded.sub);

    console.log('Found Admin:', admin);

    if (!admin) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Admin not found for ID: ' + decoded.sub);
    }

    req.admin = admin;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    } else {
      next(error);
    }
  }
};

module.exports = authMiddleware;
