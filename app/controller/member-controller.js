'use strict';

var _ = require('../model/activity');
let MemberModel = require('../model/member');
let url =require('url');

exports.readyMember = function* (next) {
    let ctx = this;
    if(ctx.locals.userInfo != undefined && ctx.locals.userInfo.openId != undefined){
        let memberId = ctx.locals.userInfo.openId;
        let memberEntity = yield MemberModel.getMember(memberId);
        if(memberEntity == undefined){
            ctx.locals.member = yield MemberModel.saveMember(new SignUpModel(ctx.locals.userInfo));
        }else{
            ctx.locals.member = memberEntity;
        }
    }
    yield next;
};

exports.oAuth2 = function* (next) {
    let ctx = this;
    if(ctx.cookies.get('userInfo') == undefined){
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
                ctx.cookies.set('userInfo',JSON.stringify(userInfo));
            }
        }
    }else{
        let cookiesUserInfo = JSON.parse(ctx.cookies.get('userInfo'));
        ctx.locals.userInfo = cookiesUserInfo;
    }
    yield next;
}