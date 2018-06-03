'use strict';
/**
 * User Controller
 * @type {{allUser: model.exports.allUser}}
 */
module.exports = {
    /**
     * 查询所有用户
     * @param req
     * @param res
     */
    allUser: function (req, res, next) {
        if (req.session.user) {
            var User = global.dbHandel.getModel('user');
            User.find(function (err, doc) {
                console.log("查询的用户数量：" + doc.length);
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    var arr = [];
                    for (var i = 0; i < doc.length; i++) {
                        arr.push(doc);
                    }
                    res.send(arr);
                }
            });
        } else {
            res.send(401);
        }
    },
    /**
     * Get register
     * @param req
     * @param res
     * @param next
     */
    register: function (req, res) {
        debugger;
        req.session.error = "";
        res.render("register", {title: '用户注册'});
    },
    /**
     * 注册用户
     * @param req
     * @param res
     * @param next
     */
    doRegister: function (req, res, next) {
        debugger;
        var User = global.dbHandel.getModel('user');
        var uname = req.body.uname;
        var upwd = req.body.upwd;
        User.findOne({name: uname}, function (err, doc) {
            if (err) {
                res.send(500);
                req.session.error = '网络异常错误！';
                console.log(err);
            } else if (doc) {
                req.session.error = '用户名已存在！';
                res.send(500);
            } else {
                // 创建一组user对象置入model
                User.create({
                    name: uname,
                    password: upwd
                }, function (err, doc) {
                    if (err) {
                        res.send(500);
                        console.log(err);
                    } else {
                        req.session.error = '用户名创建成功！';
                        res.send(200);
                    }
                });
            }
        });
    }
}