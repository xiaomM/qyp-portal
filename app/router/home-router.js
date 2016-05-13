'use strict';

var Controller = require('../controller/home-controller');

module.exports = function(app){
    //首页
    app.get('/', Controller.index);
    app.get('/activity/list', Controller.index);
};