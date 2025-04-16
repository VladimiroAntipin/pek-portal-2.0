const User = require('../models/user.model');

exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};