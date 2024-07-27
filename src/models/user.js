const bcrypt = require('bcrypt');
const connection = require('../config/db');

const createUser = async (name, password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
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
  const query = 'SELECT * FROM users WHERE username = ?';
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