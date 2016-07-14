'use strict';

var _ = require('lodash');
let wepay = require('../model/wepay');
let ActivityModel = require('../model/activity');
let SignUpModel = require('../model/signup');
let url =require('url');


let wrapResult = function (data,sucess) {
    return  {
        sucess: sucess,
        errorCode:sucess ? undefined: -1,
        errorMsg: sucess ? undefined:'未知错误',
        data:data
    };
}

exports.index = function* (next) {
    var ctx = this;
    ctx.locals.activeTab = 'activity';
    yield next
};

exports.getDetail = function* (next) {
    var ctx = this;
    var activityId = ctx.params.activityId;

    var activityEntity = yield ActivityModel.getActivityByActivityId(activityId);
    //console.log(data)
    var dutyList = activityEntity.dutyList;
    if (dutyList) {
        activityEntity.dutyList = dutyList.split('|');
    }
    var boardList = activityEntity.boardList;
    if (boardList) {
        activityEntity.boardList = boardList.split('|');
    }
    ctx.locals.activityDetail = activityEntity;
    yield next
};


exports.lists = function* () {
    yield this.render('activity/lists', {});
};
exports.check = function* () {
    yield this.render('activity/check', {});
};
exports.aboutus = function* () {
    yield this.render('activity/aboutus', {});
};

exports.detail = function* () {
    yield this.render('activity/detail', {});
};
exports.signup = function* () {
    var ctx = this;
    yield ctx.render('activity/signup', {
        //data: data,
    });
};

exports.signupSuccess = function* () {
    var ctx = this;
    yield ctx.render('activity/signup-success', {

    });
};

exports.new = function* () {
    var ctx = this;

    yield ctx.render('activity/new', {
    //console.log(data);
    });
};

exports.createActivity = function* () {
    var ctx = this;
    console.log(ctx.request.body);
    let activityEntity = new ActivityModel(ctx.request.body);
    let result = yield ActivityModel.saveActivity(activityEntity);
    ctx.body = wrapResult(result,result != undefined);
}
exports.signupActivity = function* () {
    var ctx = this;
    console.log(ctx.request.body);
    let signUpEntity = new SignUpModel(ctx.request.body);
    let result = yield SignUpModel.saveSignUp(signUpEntity);
    console.log("result = "+result);
    ctx.body = wrapResult(result,result != undefined);
}

exports.detailActivity = function* () {
    var ctx = this;
    var activityId = ctx.params.activityId;
    var activityEntity = yield ActivityModel.getActivityByActivityId(activityId);
    ctx.body = wrapResult(result,result != undefined);
}

exports.oAuth2 = function* (next) {
    let ctx = this;
    if(ctx.locals.userInfo == undefined){
        let code = ctx.request.query.code;
        if(code == undefined){
            console.log(ctx.request);
            const redirect_uri = url.format({
                protocol: 'http',
                host: ctx.request.header.host,
                pathname: ctx.request.url,
                search: ''
            });

            let urlTemplate = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
                'appid='+ctx.config.wepay.appid+'&redirect_uri='+redirect_uri+'&response_type=code&' +
                'scope=snsapi_userinfo&state=1#wechat_redirect';
            console.log('redirectTo:'+urlTemplate);
            ctx.response.redirect(urlTemplate);
        }else{
            console.log('code='+code);
            let tokenResult = yield wepay.getTokenByCode(code);
            console.log('result = '+JSON.stringify(tokenResult));
            let userInfo = yield wepay.getUserInfo(tokenResult.access_token,tokenResult.openid);
            console.log('userInfo='+JSON.stringify(userInfo));
            ctx.locals.userInfo = userInfo;
        }
    }
    yield next;
}