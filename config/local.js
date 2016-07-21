//本地调试环境配置
var path = require('path');
module.exports = {
    "env":"dev",
    "debug": true,
    "backendHost": '',
    "port": 8081,
    db:{
        uri: 'mongodb://127.0.0.1:27017/qyp-dev'
    },
    wepay:{
        appid: 'wx29f2877576637978',
        mch_id: '1357284002',
        partner_key: '5bbe06ef351b78a89223588665682435', //微信商户平台API密钥
        pfxPath: '/qyp/keys/apiclient_cert.p12' //微信商户平台证书
    }
};