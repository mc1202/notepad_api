module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'your-username',
    password: process.env.DB_PASSWORD || 'your-password',
    database: process.env.DB_NAME || 'your-database',
  },
};
