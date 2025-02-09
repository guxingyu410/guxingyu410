const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// 用户注册
router.post('/register', async (req, res) => {
  try {
    const { name, phone, username, password, role } = req.body;
    const user = new User({ name, phone, username, password, role });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid username or password');
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
