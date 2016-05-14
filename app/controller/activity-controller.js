'use strict';

var _ = require('lodash');
var DataProxy = require( 'ali-data-proxy-lite' );
var qypProxy = new DataProxy({
    getItems: 'Search.getItems',
    createActivity: 'Activity.new',
    //signupActivity: 'Activity.signup',
});

var commonJson = function* (ctx, name, params) {
    var errorJson = {
        susccessful: false,
        errorCode: -1,
        errorMsg: '未知错误',
        object: null,
    }
    console.log(params)
    var data = yield new Promise(function(resolve, reject){
        qypProxy[name](params)
            .done(function(data){
                resolve(data);
            })
            .error(function(err){
                ctx.logger.error(err)
                resolve(errorJson);
            });
    });
    yield ctx.body = data;
};


exports.index = function* (next) {
    var ctx = this;
    for (var key in ctx) {
        console.log(key)
    }
    console.log('index')
    ctx.locals.activeTab = 'activity';
    yield next
};

exports.getDetail = function* (next) {
    var ctx = this;
    var activityId = ctx.params.activityId;
    ctx.locals.activityDetail = {
        id: activityId,
        title: '第26站--渔山列岛2'
    };
    yield next
};

exports.list = function* () {
    yield this.render('activity/list', {});
};

exports.signup = function* () {
    var ctx = this;

    //var data = yield new Promise(function(resolve, reject){
    //    qypProxy.getItems({ keyword: 'iphone6' })
    //        .done(function(data){
    //            resolve(data);
    //        })
    //        .error(function(err){
    //            ctx.logger.error(err)
    //            reject(err);
    //        });
    //});
    //console.log(data);

    yield ctx.render('activity/signup', {
        //data: data,
    });
};

exports.signupSuccess = function* () {
    var ctx = this;

    yield ctx.render('activity/signup-success', {

    });
};

exports.new = function* () {
    var ctx = this;

    yield ctx.render('activity/new', {

    });
};

exports.createActivity = function* () {
    var ctx = this;
    yield commonJson(ctx, 'createActivity', ctx.request.body);
}
exports.signupActivity = function* () {
    var ctx = this;
    yield commonJson(ctx, 'signupActivity', ctx.request.body);
}