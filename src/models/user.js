const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

const createUser = async (name, password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const query = 'INSERT INTO user (userName, userPwd) VALUES (?, ?)';
  return new Promise((resolve, reject) => {
    connection.query(query, [name, password], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

const findUserByName = (name) => {
  const query = 'SELECT * FROM user WHERE userName = ?';
  return new Promise((resolve, reject) => {
    connection.query(query, [name], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};





module.exports = {
  createUser,
  findUserByName
};