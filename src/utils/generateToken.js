const jwt = require('jsonwebtoken');
const AdminModel = require('../model/admin.model');
const { JWT_SECRET } = process.env;

const generateToken = async (admin) => {
  const payload = {
    id: admin._id,
    version: admin.tokenVersion || 0,
  };

  
  const options = {
    expiresIn: '365d', 
  };

  const token = jwt.sign(payload, JWT_SECRET, options);

  await AdminModel.findByIdAndUpdate(admin._id, { tokenVersion: (admin.tokenVersion || 0) + 1 });

  return token;
};

module.exports = generateToken;