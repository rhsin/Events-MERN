require('dotenv').config(); 
const jwt = require('jsonwebtoken');

// MIDDLEWARE FOR AUTHORIZATION (LOGGED IN)
const isLoggedIn = async (req, res, next) => {
  try {
    // Check if auth header exists
    if (req.headers.authorization) {
      // Parse token from header
      const token = req.headers.authorization.split(' ')[1]; 
      //Split the header and get the token
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET);
        if (payload) {
          // Store user data in request object
          req.user = payload;
          next();
        } 
        else {
          res.status(400).json({ error: 'Token Verification failed' });
        }
      } 
      else {
        res.status(400).json({ error: 'Malformed auth header' });
      }
    } 
    else {
      res.status(400).json({ error: 'No authorization header' });
    }
  } 
  catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = { isLoggedIn };