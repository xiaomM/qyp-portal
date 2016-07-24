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
};