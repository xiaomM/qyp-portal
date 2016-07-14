//应用配置文件
var path = require('path');
var local = require('./local');
var _ = require('underscore');
var config = {
    "title":"",
    //默认生产环境
    "env":"production",
    "appName": "book",
    //端口号配置
    "port": 3002,
    //模板所在的目录
    "viewDir": path.join(__dirname,'..','app/view'),
    //log所在的目录
    "logDir": path.join(__dirname,'..', 'log'),
    //静态文件所在的目录
    "staticDir": path.join(__dirname,'..', 'public'),

    // 后端域名
    "backendHost": 'http://127.0.0.1:8091',
    "staticHost": '',
    //"staticHost": 'http://g.tbcdn.cn/platform/static',

    wepay:{
        appid: 'wxaedc01e46d43b9ba',
        mch_id: '1357284002',
        partner_key: 'D9A79001650CBA0D826614E6EB38832E', //微信商户平台API密钥
        pfxPath: './apiclient_cert.p12' //微信商户平台证书
    }

};

//当NODE_ENV环境变量值为local时
//本地调试环境
if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
    config = _.extend(config,local);
}

module.exports = config;