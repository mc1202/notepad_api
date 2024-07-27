const express = require('express');
const router = express.Router();
const { getBillType,addBill } = require('../controllers/billController')
const { protect } = require('../middleware/auth')
const { validateAddBill, validate } = require('../validators/billValidator');

// 获取账单类型
router.get('/getBillType', getBillType);

router.post('/add',protect,validateAddBill(), validate, addBill);

module.exports = router;