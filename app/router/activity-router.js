'use strict';

var Controller = require('../controller/activity-controller');

var prefix = '/activity';
var ajaxPerfix = '/ajax' + prefix;

module.exports = function(app){

    app.get(prefix + '/:activityId/signup', Controller.index, Controller.getDetail, Controller.signup);
    app.get(prefix + '/:activityId/signup/success', Controller.index, Controller.getDetail, Controller.signupSuccess);
    app.get(prefix + '/new', Controller.index, Controller.new);
    app.get(prefix + '/:activityId/detail', Controller.index, Controller.getDetail, Controller.detail);
    app.get(prefix + '/lists', Controller.lists);
    app.get(prefix + '/aboutus', Controller.aboutus);

    /**
     * Ajax
     */
    app.post(ajaxPerfix + '/new', Controller.createActivity);
    app.post(ajaxPerfix + '/signup', Controller.signupActivity);

};