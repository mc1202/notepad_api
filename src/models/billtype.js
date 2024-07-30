'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 导入 Sequelize 实例

class BillType extends Model {}

BillType.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // 可以添加更多字段
}, {
  sequelize,
  modelName: 'BillType',
  tableName: 'bill_types',
  timestamps: false, // 不使用自动生成的时间戳
});

module.exports = BillType;