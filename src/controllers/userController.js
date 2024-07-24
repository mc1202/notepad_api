const { findUserByName, createUser } = require('../models/user');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt')
const { sendSuccess, sendError } = require('../utils/responseHelper');



const register = async (req, res) => {
  const { userName, userPwd } = req.body;
  if (!userName || !userPwd) {
    return sendError(res,null,'请输入用户名或密码',400)
    // return res.status(400).json({ message: 'Name and userPwd are required' });
  }

  try {
    const existingUser = await findUserByName(userName);
    if (existingUser) {
       return sendError(res,null,'用户已存在',400)
    //   return res.status(400).json({ message: 'User already exists' });
    }
    const userId = await createUser(userName, userPwd);
    const token = generateToken({ id: userId, userName });
    sendSuccess(res,{token},'用户创建成功')
    // res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.log(error)
    sendError(res,null,'Internal server error',500)
    // res.status(500).json({ message: 'Internal server error' });
  }
}

const login = async (req, res) => {
  const { userName, userPwd } = req.body;
  if (!userName || !userPwd) {
    return sendError(res,null,'请输入用户名或密码',400)
    // return res.status(400).json({ message: 'Name and userPwd are required' });
  }

  try {
    const user = await findUserByName(userName);
    console.log(user)
    if (!user) {
      return sendError(res,null,'用户不存在',500)
    }
    if (!user || !(await bcrypt.compare(userPwd, user.userPwd))) {
      return sendError(res,null,'密码错误',401)
      // return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    sendSuccess(res,{token},'登录成功')
    // res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    register,
    login
}