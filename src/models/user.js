'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 导入 Sequelize 实例

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    defaultValue: 1003, // 设置初始值
  },
  // 其他字段
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false, // 如果你不使用自动生成的时间戳
});

module.exports = User;
