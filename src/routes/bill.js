const express = require('express');
const router = express.Router();
const { getBillType,addBill,updateBill,getBill,getBillDetail,getBillsByDateType } = require('../controllers/billController')
const { protect } = require('../middleware/auth')
const { validateAddBill, validate } = require('../validators/billValidator');

// 获取账单类型
router.get('/getBillType', getBillType);
//新建账单
router.post('/add',protect,validateAddBill(), validate, addBill);
//查询账单
router.post('/getBill',protect, getBill);
//图表数据
router.post('/getBillsByDateType',protect, getBillsByDateType);
//详情
router.post('/getBillDetail',protect, getBillDetail);

//修改账单
router.post('/update',protect,validateAddBill(), validate, updateBill);

module.exports = router;