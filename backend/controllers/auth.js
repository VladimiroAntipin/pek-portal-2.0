const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

//REGISTER USER
exports.register = async (req, res, next) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

     if (existingUser) {
        return next(new ErrorResponse('Email already in use', 400))
    }

    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//LOGIN USER
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorResponse('Please provide both email and password', 400))
        }

        //CHECK USER'S EMAIL
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse('Invalid email or password', 400))
        }

        //CHECK USER'S PASSWORD
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
           return next(new ErrorResponse('Invalid email or password', 400))
        }

        generateToken(user, 200, res);

    } catch (error) {
        console.log(error);
        return next(new ErrorResponse('Cannot log in, check your credentials', 400))
    }
};

const generateToken = async (user, statusCode, res) => {
    const token = await user.jwtGenerateToken();
    const expires = parseInt(process.env.EXPIRE_TOKEN);
    
    const options = {
        httpOnly: true,
        maxAge: expires * 1000
    };
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
};

//LOGOUT USER
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
};

//GET SINGLE USER 
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
       next(error)
    }
};

//USER PROFILE
exports.userProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
}