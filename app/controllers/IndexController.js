'use strict';

module.exports = {

    index: function (req, res) {
        debugger;
        console.debug("访问首页");
        console.debug("用户：" + req.session.user);
        //判断是否已经登录
        if (!req.session.user) {
            // res.redirect("/login");
            res.render("index", {title: '欢迎使用'});
        } else {
            var User = global.dbHandel.getModel('user');
            User.find({}, function (err, doc) {
                console.log("查询的用户数量：" + doc.length);
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    var arr = [];
                    for (var i = 0; i < doc.length; i++) {
                        arr.push(doc);
                    }
                    debugger;
                    res.render('index', {title: '欢迎使用', users: arr});
                }
            });

        }
    },
    /**
     * 退出登录
     * @param req
     * @param res
     */
    logout: function (req, res) {
        //session中user,error对象置空，并重定向到根路径
        req.session.user = null;
        req.session.error = null;
        res.redirect("/");
    },
    /**
     * Get login
     * @param req
     * @param res
     */
    login: function (req, res, next) {
        console.debug("访问登录页");
        req.session.error = "";
        res.render("login", {title: '欢迎登录'});
    },
    /**
     * 登录
     * @param req
     * @param res
     */
    doLogin: function (req, res, next) {
        console.debug("登录用户：" + req.body.uname);
        //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
        var User = global.dbHandel.getModel('user');
        var uname = req.body.uname;
        User.findOne({name: uname}, function (err, doc) {
            if (err) {
                res.send(500);
                console.log(err);
            } else if (!doc) {
                req.session.error = '用户名不存在！';
                res.send(404);
                //	res.redirect("/login");
            } else {
                if (req.body.upwd != doc.password) {
                    req.session.error = "密码错误！";
                    res.send(404);
                    //	res.redirect("/login");
                } else {
                    req.session.user = doc;
                    console.log("----session:" + doc);
                    res.send(200);

                }
            }
        });

    }

};