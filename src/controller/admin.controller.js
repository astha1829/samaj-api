const catchAsync = require('../utils/catchAsync');
const adminService = require('../service/admin.service');
const tokenService = require('../service/token.service');
const { getStandardMessage, getStandardResponse } = require('../utils/responseUtils');

const registerAdmin = catchAsync(async (req, res) => {
    try {
        const { name, email, number, password } = req.body;

        // Validate required fields
        if (!name || !email || !number || !password) {
            res.status(200).send(getStandardResponse(false, 200, 'All fields (name, email, number, password) are required'));
            return;
        }

        const adminData = { name, email, number, password };
        const createdAdmin = await adminService.createAdmin(adminData);

        if (createdAdmin) {
            res.status(200).send(getStandardMessage(true, 200, 'Admin registered successfully'));
        } else {
            res.status(200).send(getStandardResponse(false, 200, 'Failed to register admin'));
        }
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

const loginAdmin = catchAsync(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            res.status(200).send(getStandardResponse(false, 200, 'Email and password are required'));
            return;
        }

        const admin = await adminService.loginAdminWithEmailAndPassword(email, password);
        if (!admin) {
            res.status(200).send(getStandardResponse(false, 200, 'Invalid email or password'));
            return;
        }

        const tokens = await tokenService.generateAuthTokens(admin, 'admin');
        res.status(200).send(getStandardResponse(true, 200, 'Login successful', tokens));
    } catch (error) {
        console.error(error);
        res.status(200).send(getStandardResponse(false, 200, error.message));
    }
});

module.exports = {
    registerAdmin,
    loginAdmin,
};
