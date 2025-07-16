const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    console.log("📩 Incoming Request Body:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    console.log("✅ User saved successfully");

    res.status(201).json({ message: 'Signup success' });

  } catch (err) {
    console.log("❌ ERROR OCCURRED DURING SIGNUP");
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      message: 'Login success',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.log("❌ ERROR OCCURRED DURING LOGIN");
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
