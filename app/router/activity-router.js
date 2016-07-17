'use strict';

var Controller = require('../controller/activity-controller');
var MemberController = require('../controller/member-controller');

var prefix = '/activity';
var ajaxPerfix = '/ajax' + prefix;

module.exports = function(app){

    app.get(prefix + '/:activityId/signup',MemberController.oAuth2, Controller.index, Controller.getDetail, Controller.signup);
    app.get(prefix + '/success/:signupId', Controller.index, Controller.getSignUp,Controller.getDetail, Controller.signupSuccess);
    app.get(prefix + '/new', Controller.index, Controller.new);
    app.get(prefix + '/:activityId/detail', Controller.index, Controller.getDetail, Controller.detail);
    app.get(prefix + '/lists',MemberController.oAuth2, Controller.lists);
    app.get(prefix + '/mylists', Controller.mylists);
    app.get(prefix + '/aboutus', Controller.aboutus);

    /**
     * Ajax
     */
    app.post(ajaxPerfix + '/new', Controller.createActivity);
    app.post(ajaxPerfix + '/signup', Controller.signupActivity);
    app.get(ajaxPerfix + '/getDetail', Controller.detailActivity);

};