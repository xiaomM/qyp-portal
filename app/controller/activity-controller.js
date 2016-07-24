'use strict';

var _ = require('lodash');
let wepay = require('../model/wepay');
let ActivityModel = require('../model/activity');
let SignUpModel = require('../model/signup');
let MemberModel = require('../model/member');



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

exports.getPayOrder = function* (next) {
    var ctx = this;
    var signupId = ctx.params.signupId;
    let signUpEntity  = ctx.locals.signup;
    var payOrder = yield wepay.queryOrder(signupId);
    console.log("payOrder="+JSON.stringify(payOrder));
    if(payOrder.return_code != "SUCCESS"){
        signUpEntity.status = "NOTPAY";
    }else{
        signUpEntity.status = payOrder.trade_state;
        ctx.locals.signup = yield SignUpModel.saveSignUp(signUpEntity);
    }
    yield next
};


exports.lists = function* () {
    yield this.render('activity/lists', {});
};

exports.mylists = function* () {
    var ctx = this;
    ctx.locals.signList = yield SignUpModel.getSignUpListByOpenId(ctx.locals.userInfo.openid);
    yield this.render('activity/mylists', {});
};

exports.activitySignupList = function* () {
    var ctx = this;
    ctx.locals.signList = yield SignUpModel.getSignUpListByActivityId(ctx.params.activityId);
    yield this.render('activity/signupList', {});
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
    var dutyList = ctx.request.body.dutyList;
    if (ctx.request.body.dutyList) {
        ctx.request.body.dutyList = (ctx.request.body.dutyList).split("|");
    }
    if (ctx.request.body.boardList) {
        ctx.request.body.boardList = (ctx.request.body.boardList).split('|');
    }
    let activityEntity = new ActivityModel(ctx.request.body);
    let result = yield ActivityModel.saveActivity(activityEntity);
    ctx.body = wrapResult(result,result != undefined);
}
let isNull = function (str) {
    if(str == null){
        return true;
    }
    if(str == ''){
        return true;
    }
    if(str.replace(/(^s*)|(s*$)/g, "").length ==0){
        return true;
    }
    return false;
}
exports.signupActivity = function* () {
    var ctx = this;
    console.log(ctx.request.body);
    
    if(isNull(ctx.request.body.activityId)
        ||isNull(ctx.request.body.nickname)
        ||isNull(ctx.request.body.phoneNumber)
        ||isNull(ctx.request.body.email)
        ||isNull(ctx.request.body.age)
        ||isNull(ctx.request.body.sex)
        ||isNull(ctx.request.body.openid)
    ){
        ctx.body = {
            success: false,
            errorCode:-1,
            errorMsg: '请完整填写表单',
            data:''
        }
        return;
    }
    let signUpEntity = new SignUpModel(ctx.request.body);
    let result = yield SignUpModel.saveSignUp(signUpEntity);
    // if(result != undefined) {
    //     if (ctx.request.body.saveAsDefault == "1") {
    //         let openId = result.openid;
    //         let dbMemberEntity = yield MemberModel.getMember(openId);
    //         if (dbMemberEntity != undefined) {
    //             let memberEntity = new MemberModel(ctx.request.body);
    //             memberEntity._id = dbMemberEntity._id;
    //             yield MemberModel.saveMember(memberEntity);
    //         }
    //     }
    // }
    console.log("result = "+result);
    ctx.body = wrapResult(result,result != undefined);
}

exports.detailActivity = function* () {
    var ctx = this;
    var activityId = ctx.params.activityId;
    var activityEntity = yield ActivityModel.getActivityByActivityId(activityId);
    ctx.body = wrapResult(result,result != undefined);
}

