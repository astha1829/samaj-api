  
  const httpStatus = require('http-status');
  const tokenService = require('../service/token.service');
  const Admin = require('../model/admin.model');
  const ApiError = require('../utils/ApiError');
  const bcrypt = require('bcrypt');
  const SALT_ROUNDS = 10; 


  const createAdmin = async (adminData) => {
      try {
        const { name, email, number, password, role } = adminData;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
          throw new ApiError(200, 'Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const admin = await Admin.create({ name, email, number, password: hashedPassword, role });
        return { admin }; 
      } catch (error) {
        throw new ApiError(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  };

  const loginAdminWithEmailAndPassword = async (email, password) => {
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Email incorrect');
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Password incorrect');
        }

        return admin;
    } catch (error) {
        console.error('Login failed:', error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Login failed: ' + error.message, error);
    }
};
    



  module.exports = {
    createAdmin,
    loginAdminWithEmailAndPassword,

  };
