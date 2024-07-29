const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

const config = {
  development: {
    jwtSecret: process.env.JWT_SECRET || '',
    db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    port: process.env.PORT || 3000,
  },
  production: {
    db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    port: process.env.PORT || 8000,
  },
};

const currentEnv = process.env.NODE_ENV || 'development';

module.exports = config[currentEnv];
