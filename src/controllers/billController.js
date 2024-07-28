const { sendSuccess, sendError } = require('../utils/responseHelper');
const { getType,insertBill,querytBill } = require('../models/bill')
const { groupBillsByDate } = require('../utils/index')
const getBillType = async (req, res) => {
  try {
    const array = await getType();
    sendSuccess(res,array,'新建账单成功')
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
    await insertBill({...req.body,user:req.user});
    sendSuccess(res,null,'新建成功')
  } catch (error) {
    console.log(error)
    sendError(res,null,'Internal server error',500)
  }
}

const getBill = async (req,res) => {
    const {year,month} = req.body
    const formattedMonth = month ? parseInt(month, 10) : null;
    try {
    const array = groupBillsByDate(await querytBill({year,month:formattedMonth,user:req.user}));
    let total_income = 0;
    let total_expense = 0;

    array.forEach(bill => {
       total_income += parseFloat(bill.total_income);
       total_expense += parseFloat(bill.total_expense);
    });
    // console.log(groupBillsByDate(array))
    sendSuccess(res,{total_income,total_expense,record:array},'查询成功')
  } catch (error) {
    console.log(error)
    sendError(res,null,'Internal server error',500)
  }
}

module.exports = {
    getBillType,
    addBill,
    getBill
}