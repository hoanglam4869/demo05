var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boytoyRouter = require('./routes/boytoy');
var girltoyRouter = require('./routes/girltoy');
var alltoysRouter = require('./routes/alltoys');


var app = express();

//1. khai bao body parser
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

//2. khai bao mongoose
var mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var db="mongodb+srv://lamnhhcgh210990:xbP71cz3hGimz8jj@demo.ruyiggh.mongodb.net/demotoy1";

mongoose.connect(db)
.then(()=>console.log('connect successful'))
.catch((err)=>console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/boytoy', boytoyRouter);
app.use('/girltoy', girltoyRouter);
app.use('/admin/alltoys', alltoysRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.session=req.session;


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port= process.env.PORT || 3001;
app.listen(port);

module.exports = app;
