'use strict';

var fs = require('fs');
var WXPay = require('weixin-pay');
var dataProxy = require('./dataproxy');

var wxpay = WXPay({
    appid: 'wxaedc01e46d43b9ba',
    mch_id: '1357284002',
    partner_key: 'D9A79001650CBA0D826614E6EB38832E', //微信商户平台API密钥
    pfx: fs.readFileSync('./apiclient_cert.p12'), //微信商户平台证书
});

module.exports.createUnifiedOrder = function *(signup) {
    var data = yield new Promise(function(resolve, reject){
        //console.log(signup.nickName+signup._id+signup.deposit+signup.remoteIp+"==============");
        wxpay.createUnifiedOrder({
            body: '穷游派报名-'+signup.nickName,
            out_trade_no: signup._id.toString(),
            total_fee: signup.deposit,
            spbill_create_ip: signup.remoteIp,
            notify_url: 'http://wxpay_notify_url',
            trade_type: 'JSAPI',
            openid:signup.openid,
            product_id: signup.activityId
        }, function(err, result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
            console.log(result);
        });
    });
    return data;
};

module.exports.getTokenByCode = function *(code) {
    let parmas = {'appid':wxpay.appid,'secret':'9dccfeb60d96bf823b435d14a0fc6937','code':code,'grant_type':'authorization_code'};
    return yield dataProxy.callProxy('wepayToken',parmas);
}

module.exports.getUserInfo = function *(token,openid) {
    //https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
    let parmas = {'access_token':token,'openid':openid,'lang':'zh_CN'};
    return yield dataProxy.callProxy('wepayUserInfo',parmas);
}