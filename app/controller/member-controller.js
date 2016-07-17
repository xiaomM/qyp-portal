'use strict';

var _ = require('../model/activity');
let MemberModel = require('../model/member');
let SignUpModel = require('../model/signup');
let url =require('url');
let wepay = require('../model/wepay');


exports.oAuth2 = function* (next) {
    let ctx = this;
    if(ctx.cookies.get('openid') == undefined){
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
                yield MemberModel.saveMember(new SignUpModel(ctx.locals.userInfo));
                console.log('userInfo='+JSON.stringify(userInfo));
                ctx.locals.userInfo = userInfo;
                ctx.cookies.set('openid',userInfo.openid);
            }
        }
    }else{
        let openid = JSON.parse(ctx.cookies.get('openid'));
        let userInfo =yield MemberModel.getMember(memberId);
        ctx.locals.userInfo = userInfo;
    }
    yield next;
}