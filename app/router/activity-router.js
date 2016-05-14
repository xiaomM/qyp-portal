'use strict';

var Controller = require('../controller/activity-controller');

var prefix = '/activity';
var ajaxPerfix = '/ajax' + prefix;

module.exports = function(app){
    //app.get(prefix + '/*', Controller.index);
    app.get(prefix + '/list', Controller.list);
    app.get(prefix + '/:activityId/signup', Controller.index, Controller.getDetail, Controller.signup);
    app.get(prefix + '/:activityId/signup/success', Controller.index, Controller.getDetail, Controller.signupSuccess);
    app.get(prefix + '/new', Controller.index, Controller.new);


    /**
     * Ajax
     */
    app.post(ajaxPerfix + '/new', Controller.createActivity);
    app.post(ajaxPerfix + '/signup', Controller.signupActivity);
};