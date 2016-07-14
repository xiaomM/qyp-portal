var DataProxy = require( 'ali-data-proxy-lite' );
var qypProxy = new DataProxy({
    wepayToken:'wepay.token',
    wepayUserInfo:'wepay.userinfo'
});

var callProxy = function* (name, params) {
    var errorJson = {
        susccess: false,
        errorCode: -1,
        errorMsg: '未知错误',
        data: null,
    }
    console.log(params)
    var data = yield new Promise(function(resolve, reject){
        qypProxy[name](params)
            .done(function(data){
                resolve(data);
            })
            .error(function(err){
                console.log(err)
                resolve(errorJson);
            });
    });
    return data;
};

exports.callProxy = callProxy;