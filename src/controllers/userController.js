const { findUserByName, createUser } = require('../models/user');
const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt')
const { sendSuccess, sendError } = require('../utils/responseHelper');



const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return sendError(res,null,'请输入用户名或密码',400)
    // return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    const existingUser = await findUserByName(username);
    if (existingUser) {
       return sendError(res,null,'用户已存在',400)
    //   return res.status(400).json({ message: 'User already exists' });
    }
    await createUser(username, password);
    // const token = generateToken({ id: userId, username });
    sendSuccess(res,null,'用户创建成功')
    // res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.log(error)
    sendError(res,null,'Internal server error',500)
    // res.status(500).json({ message: 'Internal server error' });
  }
}

const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return sendError(res,null,'请输入用户名或密码',400)
    // return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    const user = await findUserByName(req.body.username);
    console.log(user)
    if (!user) {
      return sendError(res,null,'用户不存在',500)
    }
    if (user.password !== req.body.password) {
      return sendError(res,null,'密码错误',401)
      // return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    const {password,...info} = user
    sendSuccess(res,{token,...info},'登录成功')
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