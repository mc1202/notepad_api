const mysql = require('mysql2')
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;

dotenv.config({ path: envFile });

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port:process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone:process.env.DB_TIMEZONE
})
// console.log(process.env.DB_PASSWORD)
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID', connection.threadId);
});

module.exports = connection