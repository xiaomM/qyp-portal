'use strict';

var Controller = require('../controller/home-controller');
let config = require('../../config/config');

var prefix = config.prefix;

module.exports = function(app){
    //首页
    app.get(prefix+'/', Controller.index);
    app.get(prefix+'/activity/list', Controller.index);
    app.get(prefix+'/need_wechat', function *(next) {
        yield this.render('home/error', {errorMsg:'请使用微信浏览器浏览'});
    });
    app.get(prefix+'/no_permission', function *(next) {
        yield this.render('home/error', {errorMsg:'您没有权限浏览此页面'});
    });
    app.get(prefix+'/wechatEvent', function *(next) {
        let ctx = this;
        console.log('requst log: url:'+ctx.request.url+JSON.stringify(ctx.params)+"queryString:"+ctx.query);
        if(ctx.query.echostr != undefined){
            ctx.res.writeHead(200, {"Content-Type": "text/plain"});
            ctx.res.write(ctx.query.echostr);
            ctx.res.end();
        }else{
            ctx.res.writeHead(200, {"Content-Type": "text/plain"});
            ctx.res.write("ok");
            ctx.res.end();
        }
    });
};