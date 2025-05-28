const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Signup handler
const signup = async (req, res) => {
  try {
      const { email, password, company, dob } = req.body;
      console.log('Signup attempt:', { email, company, dob }); // Log request data
      
      // Check existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email already registered.' });
      }
      
      // Hash password and create user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const user = new User({ email, password: hashedPassword, company, dob });
      await user.save();

      console.log('User created:', user); // Log successful user creation
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

      res.status(201).json({ message: 'Signup successful', token, user });
  } catch (err) {
      console.error('Signup error:', err.message); // Log errors
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// Login handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { signup, login };
