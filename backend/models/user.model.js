const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    // Required fields
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

    // Optional fields
    patronimic: {
        type: String,
        trim: true,
        required: false
    },
    phone: {
        type: String,
        trim: true,
        required: false
    },
    birthday: {
        type: Date,
        required: false
    },
    livingIn: {
        type: String,
        trim: true,
        required: false
    },
    bornIn: {
        type: String,
        trim: true,
        required: false
    },
    education: {
        type: String,
        trim: true,
        required: false
    },
    languages: {
        type: [String],
        required: false
    },
    skills: {
        type: [String],
        required: false
    },
    profileImage: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

//ENCRYPTING PASSWORD
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);