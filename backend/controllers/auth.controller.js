const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/authJwt');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    try {
        const user = new User({
            surname: req.body.surname,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        res.send({ message: 'User was registered successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }

        const passwordIsValid = await user.comparePassword(req.body.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!'
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: 900000});
        res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 86400000});

        res.status(200).send({
            id: user._id,
            email: user.email,
            role: user.role,
            accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;

    if (!requestToken) {
        return res.status(403).json({ message: 'Refresh Token is required!' });
    }

    try {
        const refreshToken = await RefreshToken.findOne({ token: requestToken });

        if (!refreshToken) {
            return res.status(403).json({ message: 'Refresh token is not in database!' });
        }

        if (refreshToken.expiresAt < new Date()) {
            await RefreshToken.deleteOne({ token: requestToken });
            return res.status(403).json({ message: 'Refresh token was expired. Please make a new signin request' });
        }

        let newAccessToken;

        jwt.verify(requestToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }
            newAccessToken = generateAccessToken({ _id: decoded.id });
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.signOut = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        await RefreshToken.deleteOne({ token: refreshToken });

        res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};