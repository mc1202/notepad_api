

const dotenv = require('dotenv');

// Load environment variables based on the NODE_ENV
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;

dotenv.config({ path: envFile });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    timezone:process.env.DB_TIMEZONE,
    dialect: 'mysql',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    timezone:process.env.DB_TIMEZONE,
    dialect: 'mysql',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  },
};
