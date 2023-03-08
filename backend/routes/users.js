require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
// Bcrypt to hash passwords
// Jwt to sign tokens

const router = express.Router();

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { SECRET = "secret" } = process.env;

// Signup route to create a new user
router.post('/signup', async (req, res) => {
  try {
    // Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // Create a new user
    const user = await User.create(req.body);
    // Send new user as response
    res.json(user);
  } 
  catch (err) {
    res.status(400).json({ err });
  }
});

// Login route to verify a user and get a token
router.post('/login', async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      // Check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // Sign token and send it in response
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.json({ token });
      } 
      else {
        res.status(400).json({ error: "Password doesn't match" });
      }
    } 
    else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } 
  catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;