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
    activityId: {type:Number},
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
    let activity = yield ActivityModel.getActivityByActivityId(signup.activityId);
    //console.log("ctx="+ctx);
    signup.deposit = activity.deposit;
    console.log('signup = ' + JSON.stringify(signup));
    // let payOrder = yield wepay.createUnifiedOrder(signup);
    // console.log(payOrder.return_msg == "OK");
    // if(payOrder.return_code == "SUCCESS" && payOrder.return_msg == "OK"){
    //     signup.payOrderId = payOrder.prepay_id;
        return yield signup.save();
    // }else{
    //     return undefined;
    // }
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