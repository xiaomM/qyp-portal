'use strict';

var DataProxy = require( 'ali-data-proxy-lite' );
var qypProxy = new DataProxy({
    getItems: 'Search.getItems',
});


exports.index = function* (next) {
    this.locals.activeTab = 'activity';
    yield next
};


exports.lists = function* () {
    yield this.render('activity/lists', {});
};
exports.aboutus = function* () {
    yield this.render('activity/aboutus', {});
};

exports.detail = function* () {
    yield this.render('activity/detail', {});
};
exports.signup = function* () {
    var ctx = this;
    //for (var key in this) {
    //    console.log(key)
    //}

    var data = yield new Promise(function(resolve, reject){
        qypProxy.getItems({ keyword: 'iphone6' })
            .done(function(data){
                resolve(data);
            })
            .error(function(err){
                ctx.logger.error(err)
                reject(err);
            });
    });
    //console.log(data);

    yield this.render('activity/signup', {
        activeTab: 'activity',
        data: data,
    });
};
