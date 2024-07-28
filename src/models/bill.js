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

const querytBill = async ({year,month,user}) => {
  console.log(year)
  let query = 'select bills.*,bill_types.name AS bill_type from bills join bill_types on bills.bill_type_id = bill_types.id where user_id = ?';
  let params = [user.id]
  if (year) {
      query += ' and year(created_at) = ?'
      params.push(year)
      if (month) {
          query += ' and month(created_at) = ?'
          params.push(month)
      }
  }
  console.log(query,params)
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
    getType,
    insertBill,
    querytBill
}