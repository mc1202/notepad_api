'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bill_types', [
      { name: '购物', is_income: 0 },
      { name: '出行', is_income: 0 },
      { name: '餐饮', is_income: 0 },
      { name: '转账', is_income: 0 },
      { name: '工资', is_income: 1 },
      { name: '奖金', is_income: 1 },
      { name: '红包', is_income: 1 },
      { name: '其他收益', is_income: 1 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
