const connection = require('../config/db');

const getType = async () => {
  const query = 'SElECT * from bill_types';
  return new Promise((resolve, reject) => {
    connection.query(query, [], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const insertBill = async (form) => {
  const { is_income, bill_type_id,total,title,user } = form
  const query = 'INSERT INTO bills (is_income, bill_type_id,total,user_id,title) values (?,?,?,?,?)';
  return new Promise((resolve, reject) => {
    connection.query(query, [is_income, bill_type_id,total,user.id,title], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
    getType,
    insertBill
}