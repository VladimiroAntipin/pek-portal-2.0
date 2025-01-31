const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

//CHECK IF THE USER IS AUTHENTICATED
exports.isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;

    //CHECK IF TOKEN EXIST
    if (!token) {
        return next(new ErrorResponse('Please login to access this route', 401));
    }

    try {
        //VERIFY TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Please login to access this route', 401));
    }
};