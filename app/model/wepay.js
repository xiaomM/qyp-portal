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
            notify_url: 'http://www.dream623.com/activity/jspay/notify_url',
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
    let url='https://api.weixin.qq.com/sns/oauth2/access_token?' +
        'appid=' + config.wepay.appid+
        '&secret=' + config.wepay.secret+
        '&code='+code+'&grant_type=authorization_code';
    return yield getHttps(url);
}

module.exports.refund = function *(signup) {
    var params = {
        appid: config.wepay.appid,
        mch_id: config.wepay.mch_id,
        op_user_id: config.wepay.mch_id,
        out_refund_no: signup._id.toString(),
        total_fee: signup.deposit, //原支付金额
        refund_fee: signup.deposit, //退款金额
        out_trade_no: signup._id.toString()
    };

    var data = yield new Promise(function(resolve, reject) {
        wxpay.refund(params, function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
            console.log(result);
        });
    });
    return data;
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
            openid: signup.openid,
            body: signup.nickname+'支付活动费用',
            detail: signup.nickname+'支付活动费用',
            out_trade_no: signup._id.toString(),
            total_fee: signup.deposit,
            spbill_create_ip: signup.remoteIp,
            notify_url: 'http://www.dream623.com/activity/jspay/notify_url'
        }, function(err, result){
            if(err){
                console.log('统一下单接口失败:'+err);
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
    return JSON.stringify(params);

}

module.exports.notifyHandler = function (ctx) {
    let handler = wxpay.useWXCallback(function(msg, req, res, next) {
        console.log('msg:'+msg + ' req:'+req+' res:'+res);
        res.success();
    });
    return handler;
};

module.exports.queryOrder = function *(outTradeNo){
    let result = yield new Promise(function (resolve, reject) {
        wxpay.queryOrder({out_trade_no: outTradeNo}, function (err, order) {
            if(err){
                reject(err);
            }else{
                resolve(order);
            }
        });
    });
    return result;
};