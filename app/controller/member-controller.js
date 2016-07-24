'use strict';

var _ = require('../model/activity');
let MemberModel = require('../model/member');
let SignUpModel = require('../model/signup');
let url =require('url');
let wepay = require('../model/wepay');


exports.oAuth2 = function* (next) {
    let ctx = this;
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
                return;
            }else {
                console.log('code=' + code);
                let tokenResult = yield wepay.getTokenByCode(code);
                console.log('result = ' + JSON.stringify(tokenResult));
                let userInfo = yield wepay.getUserInfo(tokenResult.access_token, tokenResult.openid);
                let dbUserInfo = yield MemberModel.getMember(userInfo.openid);
                if (dbUserInfo == undefined) {
                    yield MemberModel.saveMember(new MemberModel(userInfo));
                }else{
                    console.log("user had exists userinfo="+JSON.stringify(dbUserInfo));
                }
                console.log('userInfo='+JSON.stringify(userInfo));
                ctx.locals.userInfo = userInfo;
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
        this.redirect('/need_wechat');
        return;
    }
    let openid = this.locals.userInfo.openid;
    if(contains(openid,adminList)){
        yield next;
    }
    this.redirect('/no_permission');
    return;
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