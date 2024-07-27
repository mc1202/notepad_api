const { sendSuccess, sendError } = require('../utils/responseHelper');
const { getType,insertBill } = require('../models/bill')
const getBillType = async (req, res) => {
  try {
    const array = await getType();
    sendSuccess(res,array,'成功')
  } catch (error) {
    console.log(error)
    sendError(res,null,'Internal server error',500)
  }
}

const addBill = async (req, res) => {
//   console.log(req.user)
//   const { is_income, bill_type_id,total } = req.body
//   console.log(req.body)
  try {
    const array = await insertBill({...req.body,user:req.user});
    sendSuccess(res,null,'成功')
  } catch (error) {
    console.log(error)
    sendError(res,null,'Internal server error',500)
  }
}

module.exports = {
    getBillType,
    addBill
}