function sendSuccess(res, data={}, msg = 'Success') {
    return res.status(200).json({
        status: 'sucess',
        code:200,
        msg,
        data
    })
}

function sendError(res,data = null, msg = 'An error occurred', statusCode = 500) {
  return res.status(statusCode).json({
    status: 'error',
    data,
    msg
  });
}

module.exports = {
    sendSuccess,
    sendError
}