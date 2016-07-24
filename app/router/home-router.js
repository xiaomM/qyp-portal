'use strict';

var Controller = require('../controller/home-controller');

module.exports = function(app){
    //首页
    app.get('/', Controller.index);
    app.get('/activity/list', Controller.index);
    app.get('/need_wechat', function *(next) {
        ctx.res.write('请使用微信浏览器浏览');
        return;
    });
    app.get('/no_permission', function *(next) {
        ctx.res.write('您没有权限浏览此页面');
        return;
    });
};