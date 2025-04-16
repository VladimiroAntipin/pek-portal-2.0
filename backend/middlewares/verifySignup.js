const User = require('../models/user.model');

const checkDuplicateEmail = async (req, res, next) => {
  try {
    // Check email
    const userByEmail = await User.findOne({ email: req.body.email });
    if (userByEmail) {
      return res.status(400).send({ message: 'Failed! Email is already in use!' });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  checkDuplicateEmail
};