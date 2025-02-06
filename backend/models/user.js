const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    surname: {
        type: String,
        trim: true,
        required: [true, 'Please add the surname']
    },

    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name']
    },

    patronimic: {
        type: String,
        trim: true,
        required: false
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Please add an email'],
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Please add a password']
    },

    role: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

//ENCRYPTING PASSWORD
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//VERIFY PASSWORD
userSchema.methods.comparePassword = async function (typedPassword) {
    return await bcrypt.compare(typedPassword, this.password);
};

//GET TOKEN
userSchema.methods.jwtGenerateToken = function () {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRE_TOKEN
    });
    return token;
};


module.exports = mongoose.model('User', userSchema);