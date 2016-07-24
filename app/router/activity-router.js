'use strict';

var Controller = require('../controller/activity-controller');
var MemberController = require('../controller/member-controller');
let config = require('../../config/config');

var prefix = config.prefix+'/activity';
var ajaxPerfix = config.prefix+'/ajax' + prefix;

module.exports = function(app){

    app.get(prefix + '/:activityId/signup',MemberController.oAuth2, Controller.index, Controller.getDetail, Controller.signup);
    app.get(prefix + '/success/:signupId', MemberController.oAuth2,Controller.index, Controller.getSignUp,
        Controller.getDetail,Controller.getPayOrder, Controller.signupSuccess);
    app.get(prefix + '/new', Controller.index, Controller.new);
    app.get(prefix + '/:activityId/detail', Controller.index, Controller.getDetail, Controller.detail);
    app.get(prefix + '/lists',MemberController.oAuth2, Controller.lists);
    app.get(prefix + '/mylists', MemberController.oAuth2,Controller.mylists);
    //TODO  activitySignupList
    app.get(prefix + '/:activityId/signupLists', MemberController.oAuth2,MemberController.adminAuth,Controller.activitySignupList);
    app.get(prefix + '/aboutus', Controller.aboutus);
    app.get(prefix + '/jspay/notify_url',Controller.index, Controller.wxNotify);
    

    /**
     * Ajax
     */
    app.post(ajaxPerfix + '/new', Controller.createActivity);
    app.post(ajaxPerfix + '/signup', Controller.signupActivity);
    app.get(ajaxPerfix + '/getDetail', Controller.detailActivity);

};