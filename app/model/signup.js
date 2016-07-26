'use strict';
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let ActivityModel = require('../model/activity');

var wepay = require('./wepay');

var Schema = mongoose.Schema;


/*
var mockJson = {
    "success": true,
    "data": {
        activityId: '3',
        nickname: 'sdf',
        phoneNumber: '18626888086',
        email: '305301818@qq.com',
        age: '12',
        sex: 'boy',
        isSingle: '1',
        board: '水',
        talent: 'sdf',
        duty: '电',
        remarks: 'sdf',
        openid: '18626888086'
    }
};
*/

/**
 * User schema
 */

var SignUpSchema = new Schema({
    activityObjId:{type:Schema.Types.ObjectId},
    activityId:{type:Number},
    activity:{type:String},
    signname:{type:String}, //报名参加活动的用户,
    nickname: {type:String},// nickname	用户昵称
    phoneNumber: {type:String},
    email: {type:String},
    age: {type:Date},
    sex: {type:String},//sex	用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    isSingle: {type:Boolean},
    board: {type:String},
    talent: {type:String},
    duty: {type:String},
    deposit: {type:Number},
    remarks: {type:String},
    openid: {type:String},//openid	用户的唯一标识
    remoteIp:{type:String,default:"127.0.0.1"},
    payOrderId:{type:String},
    gmtCreate:{type:Date,default:new Date()},
    province:{type:String},
    city:{type:String},
    country:{type:String},
    headimgurl:{type:String},
    unionid:{type:String},
    status:{type:String,default:"NOTPAY"}
});

/**
 * User plugin
 */


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */


SignUpSchema.statics.saveSignUp = function* (signup) {
    if (signup.activity == undefined || signup.deposit == undefined) {
        let activity = yield ActivityModel.getActivityByActivityId(signup.activityId);
        signup.deposit = activity.deposit;
        signup.activity = activity.activityTitle;
    }
    if (signup.status == undefined) {
        signup.status = "NOTPAY";
    }
    console.log('signup = ' + JSON.stringify(signup));
    return yield signup.save();
};

SignUpSchema.statics.getSignUp = function* (signupId) {
    let signupEntity =  (yield SignUpModel.findOne({_id:signupId}).exec());
    console.log('signupEntity = '+signupEntity);
    return signupEntity;
};

SignUpSchema.statics.getSignUpListByOpenId = function* (openid) {
    let signUpList =  (yield SignUpModel.find({openid:openid}).exec());
    console.log('signUpList = '+signUpList);
    return signUpList;
};
SignUpSchema.statics.getSignUpListByActivityId = function* (activityId) {
    let signUpList =  (yield SignUpModel.find({activityId:activityId}).exec());
    console.log('signUpList = '+signUpList);
    return signUpList;
};

SignUpSchema.statics.getSignUpListByCondition = function* (condition) {
    let signUpList =  (yield SignUpModel.find(condition).exec());
    console.log('signUpList = '+signUpList);
    return signUpList;
};


/**
 * Statics
 */

SignUpSchema.static({

});

/**
 * Register
 */

mongoose.model('SignUp', SignUpSchema);

let SignUpModel = mongoose.model('SignUp');

module.exports=SignUpModel;