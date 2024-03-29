require('dotenv').config({path: "./common/.env"});
const __DEV__ = process.env.NODE_ENV;
if (__DEV__ === "DEV") {
  // 테스트환경
  console.log("테스트환경")
  require('dotenv').config({path: "./common/.env.dev"});
} else if (__DEV__ === "LOCAL") {
  // 개발환경
  console.log("개발환경")
  require('dotenv').config({path: "./common/.env.local"});
} else {
  // 운영환경
  console.log("운영환경")
  require('dotenv').config({path: "./common/.env.prod"});
}

const createError = require('http-errors');
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors({
  origin: "*",
  credentials: true,
}));

// didididi

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userroutes');
const spaceRouter = require('./routes/spaceroutes');
const menuRouter = require('./routes/menuroutes');
const orderRouter = require("./routes/orderroutes");
const paymentRouter = require("./routes/paymentroutes");
const manageRouter = require("./routes/manageroutes");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/table', spaceRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/manage', manageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
