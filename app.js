var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');//antes de las rutas, para que las afecte.
var {veryUser} = require('./middlewares/auth')
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const singUpRouter = require('./routes/sing-up');
const loginRouter = require('./routes/login');
const filesRouter = require('./routes/files');
const myPerfilRouter = require('./routes/myPerfil');
var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'pass secreto',
    cookie:{maxAge:null},
    resave:true,
    saveUninitialized:false
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sing-up', singUpRouter);
app.use('/login', loginRouter);
app.use('/Perfil', veryUser, myPerfilRouter);
app.use('/files',veryUser, filesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
