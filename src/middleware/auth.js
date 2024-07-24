const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/responseHelper');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return sendError(res,null,'登录失效',401)
    // return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
  }

  try {
    const decoded = await verifyToken(token);
    req.user = { id: decoded.id, name: decoded.name };
    next();
  } catch (err) {
    return sendError(res,null,'token错误',401)
    // return res.status(401).json({ message: 'Invalid token or token expired' });
  }
};

module.exports = protect;