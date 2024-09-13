const { sendError } = require('../utils/responseHelper');
const { body, validationResult } = require('express-validator');

// 定义验证规则
const validateAddBill = () => {
  return [
    body('bill_type_id').isInt().isLength({ min:1, max: 1 }).withMessage('账单类型错误'),
    body('is_income').isInt([0, 1]).withMessage('账单类别错误'),
    body('total').isDecimal().withMessage('金额错误'),
    body('title').isString().withMessage('缺少标题')
  ];
};

// 创建一个中间件来处理验证结果
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res,null,errors.array(),400)
  }
  next();
};

module.exports = {
  validateAddBill,
  validate
};