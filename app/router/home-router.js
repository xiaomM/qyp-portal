'use strict';

var Controller = require('../controller/home-controller');

var prefix = config.prefix;

module.exports = function(app){
    //首页
    app.get(prefix+'/', Controller.index);
    app.get(prefix+'/activity/list', Controller.index);
    app.get(prefix+'/need_wechat', function *(next) {
        ctx.res.write('请使用微信浏览器浏览');
        return;
    });
    app.get(prefix+'/no_permission', function *(next) {
        ctx.res.write('您没有权限浏览此页面');
        return;
    });
};