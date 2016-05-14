var debug = require('debug')('book');
var koa = require('koa');
var _ = require('lodash');

//配置文件
var config = require('./config/config');

var interfacePlus = require('./app/utils/interface-plus');
interfacePlus.init();


var app = koa();
app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});

//log记录
var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

var onerror = require('koa-onerror');
onerror(app);

app.context.locals = {};

//xtemplate对koa的适配
//var xtplApp = require('xtpl/lib/koa');
var xtplApp = require('./app/utils/koa-xtpl-plus');

//xtemplate模板渲染
xtplApp(app,{

    //配置模板目录
    views: config.viewDir
});


var DataProxy = require( 'ali-data-proxy-lite' );

// interface配置文件的绝对路径
var path = require('path').resolve( __dirname, './config/interface/interface.json' );

// 初始化引入接口配置文件  （注意：初始化工作有且只有一次）
DataProxy.init( path );

var session = require('koa-session');
app.use(session(app));


//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//数据校验
var validator = require('koa-validator');
app.use(validator());

//静态文件cache
var staticCache = require('koa-static-cache');
var staticDir = config.staticDir;
app.use(staticCache(staticDir+'/js'));
app.use(staticCache(staticDir+'/css'));

app.use(require('koa-static')('.'));


//路由
var router = require('koa-router');
app.use(router(app));

//应用路由
var homeRouter = require('./app/router/home-router');
var activityRouter = require('./app/router/activity-router');

homeRouter(app);
activityRouter(app);

app.listen(config.port);
console.log('listening on port %s',config.port);

module.exports = app;

