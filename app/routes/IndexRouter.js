'use strict';
var express = require('express');
var indexRouter = express.Router();
var indexController = require("../controllers/IndexController");
var userController = require("../controllers/UserController");

//todo:路由管理
/*根目录*/
indexRouter.get('/', indexController.index);
/*登录 */
indexRouter.route("/login").get(indexController.login).post(indexController.doLogin);
/*退出登录 */
indexRouter.get("/logout", indexController.logout);
/*注册 */
indexRouter.route("/register").get(userController.register).post(userController.doRegister);
/*获取所有用户*/
indexRouter.get("/allUser", userController.allUser);
module.exports = indexRouter;