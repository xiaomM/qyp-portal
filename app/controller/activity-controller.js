'use strict';

var _ = require('lodash');
var DataProxy = require( 'ali-data-proxy-lite' );
var qypProxy = new DataProxy({
    getItems: 'Search.getItems',
    createActivity: 'Activity.new',
    getDetail: 'Activity.summary'
    
    //signupActivity: 'Activity.signup',
});

var commonJson = function* (ctx, name, params) {
    var errorJson = {
        susccessful: false,
        errorCode: -1,
        errorMsg: '未知错误',
        object: null,
    }
    //console.log(params)
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
    //for (var key in ctx) {
    //    console.log(key)
    //}
    //console.log('index')
    ctx.locals.activeTab = 'activity';
    yield next
};

exports.getDetail = function* (next) {
    var ctx = this;
    var activityId = ctx.params.activityId;
    var params = {
        activityId: activityId,
    }
    var data = yield new Promise(function(resolve, reject){
        qypProxy.getDetail(params)
            .done(function(data){
                resolve(data);
            })
            .error(function(err){
                ctx.logger.error(err)
                reject(err);
            });
    });
    console.log(data)
    ctx.locals.activityDetail = data;
    yield next
};


exports.lists = function* () {
    yield this.render('activity/lists', {});
};
exports.check = function* () {
    yield this.render('activity/check', {});
};
exports.aboutus = function* () {
    yield this.render('activity/aboutus', {});
};

exports.detail = function* () {
    yield this.render('activity/detail', {});
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
    //console.log(data);
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
exports.detailActivity = function* () {
    var ctx = this;
    yield commonJson(ctx, 'getDetail', ctx.request.query);
}