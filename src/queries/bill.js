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
  const query = 'INSERT INTO bills (is_income, bill_type_id,total,user_id,title) values (?,?,?,?,?) where id = ';
  return new Promise((resolve, reject) => {
    connection.query(query, [is_income, bill_type_id,total,user.id,title], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const modifyBill = async (form) => {
  const { id,...obj} = form
  const keys = Object.keys(obj)
  const values = Object.values(obj)
  const setClause =keys.map(key => `${key} = ?`).join(',')

  const query = `update bills set ${setClause} where id = ? `;
  values.push(id)
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const querytBill = async ({year,month,week,user}) => {
  console.log(year,month)
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

const querytBillDetail = async ({id,user}) => {
  let query = `select * from bills where user_id = ${user.id} and id = ${id}`;
  // console.log(query,params)
  return new Promise((resolve, reject) => {
    connection.query(query, [], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const queryBillsByDateType = async ({is_income,dateType,user}) => {
  let query = `select bills.*,bill_types.name AS bill_type FROM bills join bill_types on bills.bill_type_id = bill_types.id where user_id = ${user.id} and bills.is_income = ${is_income} `;
  if (dateType == 'week') {
    query += `and yearweek(created_at, 1) = yearweek(curdate(), 1)`
  } else if (dateType == 'month') {
    query += `and year(created_at) = year(curdate()) and month(created_at) = month(curdate())`
  } else {
    query += 'and year(created_at) = year(curdate())'
  }
  // let params = [user.id]
  // if (year) {
  //     query += ' and year(created_at) = ?'
  //     params.push(year)
  //     if (month) {
  //         query += ' and month(created_at) = ?'
  //         params.push(month)
  //     }
  // }
  // console.log(query,params)
  return new Promise((resolve, reject) => {
    connection.query(query, [], (err, results) => {
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
    modifyBill,
    querytBill,
    querytBillDetail,
    queryBillsByDateType
}