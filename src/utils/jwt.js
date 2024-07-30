const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, name: user.username }, process.env.JWT_SECRET, {
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
}