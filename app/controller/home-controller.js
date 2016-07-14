'use strict';

var _ = require('../model/activity');
var mongoose = require('mongoose');

exports.index = function* () {
    let ActivityModel = mongoose.model('Activity');
    let activityEntity = new ActivityModel({});
    console.log('activityEntity = '+activityEntity._id);
    activityEntity.save();
    let result = yield ActivityModel.find({});
    console.log('result = '+result.length);

    console.log('activityEntity.countActivity' + activityEntity.countActivity);
    let count = yield activityEntity.countActivity();
    console.log('countActivity = ' + count);
    let count2 = activityEntity.countActivity();
    console.log('countActivity = ' + count2);
    yield this.render('home/index', {});
};
