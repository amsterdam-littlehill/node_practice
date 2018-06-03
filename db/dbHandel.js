var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*var models = require("./models/user");*/
var models = require("../app/models/UserModel");
mongoose.Promise = global.Promise;
//todo:model管理
/*调试模式是mongoose提供的一个非常实用的功能，用于查看mongoose模块对mongodb操作的日志，一般开发时会打开此功能，以便更好的了解和优化对mongodb的操作。*/
mongoose.set('debug', true);


for(var m in models){
    mongoose.model(m,new Schema(models[m]));
}

module.exports = {
    getModel: function(type){
        return _getModel(type);
    }
};

var _getModel = function(type){
    return mongoose.model(type);
};