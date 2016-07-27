'use strict';

var _ = require('../model/activity');
let MemberModel = require('../model/member');
let SignUpModel = require('../model/signup');
let url =require('url');
let wepay = require('../model/wepay');


exports.oAuth2 = function* (next) {
    let ctx = this;
    if(ctx.session.userInfo == undefined) {
        let code = ctx.request.query.code;
        if (code == undefined) {
            console.log(ctx.request);
            let prefix = '';
            if (ctx.config.env === "dev") {
                prefix = '/development';
            }
            const redirect_uri = url.format({
                protocol: 'http',
                host: 'www.dream623.com',
                pathname: prefix + ctx.request.url,
                search: ''
            });

            let urlTemplate = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
                'appid=' + ctx.config.wepay.appid + '&redirect_uri=' + redirect_uri + '&response_type=code&' +
                'scope=snsapi_userinfo&state=1#wechat_redirect';
            console.log('redirectTo:' + urlTemplate);
            ctx.response.redirect(urlTemplate);
            return;
        } else {
            console.log('code=' + code);
            let tokenResult = yield wepay.getTokenByCode(code);
            console.log('result = ' + JSON.stringify(tokenResult));
            let userInfo = yield wepay.getUserInfo(tokenResult.access_token, tokenResult.openid);
            let dbUserInfo = yield MemberModel.getMember(userInfo.openid);
            if (dbUserInfo == undefined) {
                yield MemberModel.saveMember(new MemberModel(userInfo));
            } else {
                console.log("user had exists userinfo=" + JSON.stringify(dbUserInfo));
            }
            console.log('userInfo=' + JSON.stringify(userInfo));
            ctx.locals.userInfo = userInfo;
            ctx.session.userInfo = userInfo;
        }
    }else{
        ctx.locals.userInfo = ctx.session.userInfo;
    }
    yield next;
}

exports.adminAuth = function *(next) {
    let adminList = ['oNhOfwaLwXzNsKv880bBc9ZccpLo',
        'oNhOfwXVoHymdNYauxLYMb14hYTM',
        'oNhOfwT-Ip-5rrWrkR-ITIFIxECk',
        'oNhOfwfWx4OZ-faxO5eXc8udEKW8',
        'oNhOfwe0QYY_ndO2dV8l9CmcfO2U',
        'oNhOfwdsYwHZKyaDyUU6w7n2Q52s',
        'oNhOfwbqAI63ZrV21NLAmUwbYy-4',
        'oNhOfwbtOumBFwc3EUxyDEMdP41s',
    ];
    if(this.locals.userInfo == undefined
    ||this.locals.userInfo.openid == undefined){
        this.redirect(this.config.prefix+'/need_wechat');
        return;
    }
    let openid = this.locals.userInfo.openid;
    if(contains(adminList,openid)){
        yield next;
    }else{
        this.redirect(this.config.prefix+'/no_permission');
        return;
    }
}

function contains(arr, str) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === str) {
            return true;
        }
    }
    return false;
}