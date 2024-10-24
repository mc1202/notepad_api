const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('../logger');
const cors = require('cors')
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;

dotenv.config({ path: envFile });


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRoutes = require('./routes/auth');
const billRoutes = require('./routes/bill');


const corsOptions = {
  origin:'http://192.168.0.104:9000',
  methods:'GET,POST',
  credentials: true, // 允许携带凭证（cookies）
  optionsSuccessStatus: 204,
}

var app = express();

app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('morgan')('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRoutes)
app.use('/bill',billRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  next()
});

// error handler
app.use(function(err, req, res, next) {
  logger.error(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
