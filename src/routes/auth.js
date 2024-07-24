const express = require('express');
const router = express.Router();
const { login,register } = require('../controllers/userController')

// 注册路由
router.post('/register', register);

// 登录路由
router.post('/login', login);

module.exports = router;