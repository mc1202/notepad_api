const express = require('express');
const router = express.Router();
const { getBillType,addBill,getBill } = require('../controllers/billController')
const { protect } = require('../middleware/auth')
const { validateAddBill, validate } = require('../validators/billValidator');

// 获取账单类型
router.get('/getBillType', getBillType);
//新建账单
router.post('/add',protect,validateAddBill(), validate, addBill);
//查询账单
router.post('/getBill',protect, getBill);


module.exports = router;