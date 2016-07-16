'use strict';

var fs = require('fs');
var WXPay = require('weixin-pay');
const https = require('https');
let config = require('../../config/config');

let getHttps = function *(url) {
    var errorJson = {
        susccess: false,
        errorCode: -1,
        errorMsg: '未知错误',
        data: null
    };

    console.log(url);
    var data = yield new Promise(function(resolve, reject){
        https.get(url, (res) => {
            console.log('statusCode: ', res.statusCode);
            console.log('headers: ', res.headers);

            res.on('data', (d) => {
                resolve(JSON.parse(new String(d)));
            });
        }).on('error', (e) => {
            errorJson.data = e;
            reject(errorJson);
        });
    });
    return data;
    
}


var wxpay = WXPay({
    appid: config.wepay.appid,
    mch_id: config.wepay.mch_id,
    partner_key: config.wepay.partner_key, //微信商户平台API密钥
    pfx: fs.readFileSync(config.wepay.pfxPath), //微信商户平台证书
});

module.exports.createUnifiedOrder = function *(signup) {
    var data = yield new Promise(function(resolve, reject){
        //console.log(signup.nickname+signup._id+signup.deposit+signup.remoteIp+"==============");
        wxpay.createUnifiedOrder({
            body: '穷游派报名-'+signup.nickname,
            out_trade_no: signup._id.toString(),
            total_fee: signup.deposit,
            spbill_create_ip: signup.remoteIp,
            notify_url: 'http://wxpay_notify_url',
            trade_type: 'JSAPI',
            openid:signup.memberId,
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
    let url='https://api.weixin.qq.com/sns/oauth2/access_token?' +
        'appid=wxaedc01e46d43b9ba' +
        '&secret=9dccfeb60d96bf823b435d14a0fc6937' +
        '&code='+code+'&grant_type=authorization_code';
    return yield getHttps(url);
}

module.exports.getUserInfo = function *(token,openid) {
    let url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+token+'&openid='+openid+'&lang=zh_CN';
    //https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
    //let parmas = {'access_token':token,'openid':openid,'lang':'zh_CN'};
    return yield getHttps(url);
}

module.exports.getJsApiParams = function *(signup) {
    let params = yield new Promise(function (resolve, reject) {
        wxpay.getBrandWCPayRequestParams({
            openid: signup.memberId,
            body: signup.nickname+'支付活动费用',
            detail: signup.nickname+'支付活动费用',
            out_trade_no: signup._id.toString(),
            total_fee: signup.deposit,
            spbill_create_ip: signup.remoteIp,
            notify_url: 'http://www.dream623.com/jspay/notify_url'
        }, function(err, result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
    return JSON.stringify(params);

}