'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('bills', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          allowNull: false,
        },
        bill_type_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'bill_types',
            key: 'id',
          },
          allowNull: false,
        },
        total: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        remarks: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        is_income: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),  // 使用数据库的 CURRENT_TIMESTAMP
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bills');
  }
};
