var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');//文件上传中间件
var mongoose = require('mongoose');
var session = require('express-session');

global.dbHandel = require('./db/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/expressDB");

/*var routes = require('./routes/index');*/
var indexRoutes = require('./app/routes/IndexRouter');
//var users = require('./routes/users');

var app = express();

app.use(session({
    secret: 'amsterdam', // 用来对session id相关的cookie进行签名
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 1000 * 60 * 30 // 有效期，单位是毫秒
    }
}));

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');
//开启jade调试
app.set('view options', { debug: true });
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// 文件上传 begin

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/user')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});
var cpUpload = upload.any();
app.use(cpUpload);
// 文件上传 end
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = "";
    if (err) {
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' + err + '</div>';
    }
    next();
});

app.use('/', indexRoutes);  // 即为为路径 / 设置路由
app.use('/login', indexRoutes); // 即为为路径 /login 设置路由
app.use('/register', indexRoutes); // 即为为路径 /register 设置路由
app.use("/logout", indexRoutes)// 即为为路径 /logout 设置路由

// catch 404 and forward to error handler;
app.use(function (req, res, next) {
    next(createError(404));
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;
