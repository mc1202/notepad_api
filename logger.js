const winston = require('winston');

// 创建日志记录器
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // 输出到控制台
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // 错误日志文件
    new winston.transports.File({ filename: 'combined.log' }) // 所有日志文件
  ],
});

// 导出日志记录器
module.exports = logger;
