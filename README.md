[TOC]
### express

#### 初始化
1. 生成项目对应的package.json
    ```
    npm init
    ```
2. 安装express管理器 (新express4.0+版本中将命令工具分出来了，所以必须要全局安装express-generator))
    ```text
    npm install express-generator -g 
    npm install express --save--dev
    ```
3. 初始化express框架 
    ```text
    express
    ```
4. 安装express所连带的其他依赖包
    ```
   npm install
    ```
5. 运行项目
    ```
    # Run the myapp on Windows
   SET DEBUG=myapp:* & npm start
   
    # Run myapp on Linux/Mac OS X
   DEBUG=myapp:* npm start
    ```
6. 使用nodemon修改文件的时候，express服务就会自动重启
    1. `npm install --save-dev nodemon`
    2. 修改 package.json 的 scripts 内容：
       ```
        "scripts": {
                  "start": "node ./bin/www",
                  "devstart": "nodemon ./bin/www"
                }
       ```
    3. 使用 `SET DEBUG=myapp:* & npm run devstart` 启动 express 服务  

#### 目录结构

```
/myapp
    app.js
    /bin
        www :应用的主入口,引入app.js；创建node HTTP server
    package.json
    /node_modules
        [about 4,500 subdirectories and files]
    /public 静态文件
        /images
        /javascripts
        /stylesheets
            style.css
    /routes 路由信息
        index.js
        users.js
    /views  视图文件
        error.pug
        index.pug
        layout.pug

```

#### mongoose

  Mongoose是MongoDB的一个对象模型工具，是基于node-mongodb-native开发的MongoDB nodejs驱动，可以在异步的环境下执行。
    
  同时它也是针对MongoDB操作的一个对象模型库，封装了MongoDB对文档的的一些增删改查等常用方法，让NodeJS操作Mongodb数据库变得更加灵活简单。
    
  我们通过Mongoose去创建一个“集合”并对其进行增删改查，就要用到它的三个属性：Schema(数据属性模型)、Model、Entity
  
1. 在项目根目录下建立一个database文件夹，建立文件 models.js  
    ```javascript
    module.exports = { 
        user:{ 
            name:{type:String,required:true},
            password:{type:String,required:true}
        }
    };
    ```
2. 然后建立model处理文件 dbHandel.js
    ```javascript
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var models = require("./models");
    
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
    ```
3. 安装`multer`和 `mongoose`模块    
    ```text
    npm i multer mongoose --save --dev
    ```
4. `MongoDB`
   
   1. 下载MongoDB并安装，下载地址：http://www.mongodb.org/downloads
         
         安装路径`c:\mongodb`
    
   2. 创建数据库和日志存放目录
        
       ```text
        mkdir c:\mongodb\db
        mkdir c:\mongodb\log
         ```
   3. 创建config文件
   
        打开目录`“C:\mongodb\bin\”`，并在此目录下新建一个mongod.cfg文件，文件内容如下
           
        ```text
        systemLog:
            destination: file
            path: c:\mongodb\log\mongod.log
        storage:
            dbPath: c:\mongodb\db
         ```
           
   4. 添加环境变量
        
        在环境变量PATH中加入 `C:\mongodb\bin\` 
        
   5. 安装 MongoDB服务
        
        以管理员方式打开CMD窗口，运行如下命令安装MongoDB服务，可以在 “控制面板\所有控制面板项\管理工具\服务”找到名为“MongoDB”的服务右键启动
    
        ```text
        C:\mongodb\bin\mongod.exe --config "C:\mongodb\mongod.cfg" --install --serviceName "MongoDB"
        ```
   
   6. 启动服务 
        
        在CMD窗口中运行如下命令
    
        ```text
        net start MongoDB
        ```
   7. 关闭MongoDB服务
      
      ```text
      net stop MongoDB
      ```
      
   8. 移除 MongoDB 服务
      
      ```text
       C:\mongodb\bin\mongod.exe --remove 
       ```
      
#### 断点调试
1. nodejs内置Debug结合Chrome DevTools

   使用Chrome DevTools通过中间过程调试Node.js应用程序，该过程将Chromium中使用的Inspector协议转换为Node.js中使用的V8调试器协议
   
   环境要求：`nodejs 6.3+`&`Chrome 55+`
       
       Open the chrome://inspect/#devices  URL
       
       Enable the Developer Tools experiments flag
       
       Press "Open dedicated DevTools for Node" 
       
       运行 node --inspect app.js 
       
   `旧版调试器自7.7.0版开始已弃用。请使用--inspect和Inspector  `
     
   参考：https://cnodejs.org/topic/5a1a7605476ea1170b733af4
       
2. node-inspector
    
    `npm install -g node-inspect node-pre-gyp `
    
    node 8.*以上版本不支持 [node-inspector issues](https://github.com/node-inspector/node-inspector/issues/1010#issuecomment-306972510)
    
3. webstorm启动    

    在webstorm中创建node express项目
 