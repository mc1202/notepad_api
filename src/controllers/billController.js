const { sendSuccess, sendError } = require('../utils/responseHelper');
const { getType,insertBill,querytBill,queryBillsByDateType } = require('../queries/bill')
const { groupBillsByDate } = require('../utils/index')
const getBillType = async (req, res) => {
  try {
    const array = await getType();
    sendSuccess(res,array,'查询成功')
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
    const {year,month,week} = req.body
    const formattedMonth = month ? parseInt(month, 10) : null;
    try {
    const array = groupBillsByDate(await querytBill({year,month:formattedMonth,week,user:req.user}));
    let total_income = 0;
    let total_expense = 0;

    array.forEach(bill => {
       total_income += parseFloat(bill.total_income);
       total_expense += parseFloat(bill.total_expense);
    });
    sendSuccess(res,{total_income,total_expense,record:array},'查询成功')
  } catch (error) {
    console.log(error)
    sendError(res,null,'Internal server error',500)
  }
}

const getBillsByDateType = async (req,res) => {
    try {
    const array = await queryBillsByDateType({...req.body,user:req.user});
    const billTypeTotals = array.reduce((acc, bill) => {
        if (acc[bill.bill_type]) {
            acc[bill.bill_type] += parseFloat(bill.total);
        } else {
            acc[bill.bill_type] = parseFloat(bill.total);
        }
        return acc;
    }, {});

    // 提取账单类型和对应的总金额
    const billTypes = Object.keys(billTypeTotals);
    const totalAmounts = Object.values(billTypeTotals);
    sendSuccess(res,{xAxis:billTypes,series:totalAmounts},'查询成功')
  } catch (error) {
    console.log(error)
    sendError(res,null,'Internal server error',500)
  }
}

module.exports = {
    getBillType,
    addBill,
    getBill,
    getBillsByDateType
}