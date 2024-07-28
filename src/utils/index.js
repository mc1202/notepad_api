const getCurrentDate = (dateFormat,date = null) => {
  const now = date ? new Date(date) : new Date();

  const formatDatePart = (part) => {
    return part.toString().padStart(2, '0');
  };

  const year = now.getFullYear().toString();
  const month = formatDatePart(now.getMonth() + 1);
  const day = formatDatePart(now.getDate());
  const hours = formatDatePart(now.getHours());
  const minutes = formatDatePart(now.getMinutes());
  const seconds = formatDatePart(now.getSeconds());

  return dateFormat
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

const getDayOfWeek = (dateString) => {
  const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return daysOfWeek[dayOfWeek];
}

const groupBillsByDate = (arr) => {
    let bills = []
    bills = arr.map(item => {
        item.date = getCurrentDate('MM月dd日',item.created_at)
        item.day = getDayOfWeek(item.created_at)
        return item
    })
    const result = bills.reduce((acc, bill) => {
     const date = bill.date;
     const day = bill.day
     const total = parseFloat(bill.total);

    if (!acc[date]) {
        acc[date] = {
        date,
        day,
        total_income: 0,
        total_expense: 0,
        bills: []
        };
    }

    if (bill.is_income) {
        acc[date].total_income += total;
    } else {
        acc[date].total_expense += total;
    }

    acc[date].bills.push(bill);

    return acc;
    }, {});
    return Object.values(result)
}

module.exports = {
    getCurrentDate,
    groupBillsByDate
}