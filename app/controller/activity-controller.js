'use strict';

var _ = require('lodash');
let wepay = require('../model/wepay');
let ActivityModel = require('../model/activity');
let SignUpModel = require('../model/signup');



let wrapResult = function (data,sucess) {
    return  {
        success: sucess,
        errorCode:sucess ? undefined: -1,
        errorMsg: sucess ? undefined:'未知错误',
        data:data
    };
}

exports.index = function* (next) {
    var ctx = this;
    ctx.locals.activeTab = 'activity';
    console.log('requst log: url:'+ctx.request.url+JSON.stringify(ctx.params));
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

exports.getSignUp = function* (next) {
    var ctx = this;
    var signupId = ctx.params.signupId;
    var signupEntity = yield SignUpModel.getSignUp(signupId);
    ctx.params.activityId = signupEntity.activityId;
    ctx.locals.signup = signupEntity;
    yield next
};


exports.lists = function* () {
    yield this.render('activity/lists', {});
};

exports.mylists = function* () {
    var ctx = this;
    yield SignUpModel.getSignUpListByOpenId(ctx.locals.userInfo.openid);
    yield this.render('activity/mylists', {});
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
    ctx.locals.payargs = yield wepay.getJsApiParams(ctx.locals.signup);
    yield ctx.render('activity/signup-success', {

    });
};

exports.new = function* () {
    var ctx = this;

    yield ctx.render('activity/new', {
    //console.log(data);
    });
};

exports.wxNotify = function* () {
    var ctx = this;
    console.log(ctx.request.body);
    ctx.res.write('FAIL');
}

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
    if(result != undefined) {
        if (ctx.request.body.saveAsDefault != undefined) {
            let openId = result.openid;
            let dbMemberEntity = yield MemberModel.getMember(openId);
            if (dbMemberEntity != undefined) {
                let memberEntity = new MemberModel(ctx.request.body);
                memberEntity._id = dbMemberEntity._id;
                yield MemberModel.saveMember(memberEntity);
            }
        }
    }
    console.log("result = "+result);
    ctx.body = wrapResult(result,result != undefined);
}

exports.detailActivity = function* () {
    var ctx = this;
    var activityId = ctx.params.activityId;
    var activityEntity = yield ActivityModel.getActivityByActivityId(activityId);
    ctx.body = wrapResult(result,result != undefined);
}

