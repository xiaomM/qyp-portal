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
        nickName: 'sdf',
        phoneNumber: '18626888086',
        email: '305301818@qq.com',
        age: '12',
        sex: 'boy',
        isSingle: '1',
        board: '水',
        talent: 'sdf',
        duty: '电',
        remarks: 'sdf',
        memberId: '18626888086'
    }
};
*/

/**
 * User schema
 */

var SignUpSchema = new Schema({
    activityObjId:{type:Schema.Types.ObjectId},
    activityId: {type:Number},
    nickName: {type:String},
    phoneNumber: {type:String},
    email: {type:String},
    age: {type:Number},
    sex: {type:String},
    isSingle: {type:Boolean},
    board: {type:String},
    talent: {type:String},
    duty: {type:String},
    deposit: {type:Number},
    remarks: {type:String},
    memberId: {type:String},
    remoteIp:{type:String,default:"127.0.0.1"},
    payOrderId:{type:String},
    openid:{type:String},
    gmtCreate:{type:Date,default:new Date()}
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
    signup.openid = '123456';
    let payOrder = yield wepay.createUnifiedOrder(signup);
    console.log(payOrder.return_msg == "OK");
    if(payOrder.return_code == "SUCCESS" && payOrder.return_msg == "OK"){
        signup.payOrderId = payOrder.prepay_id;
        return yield signup.save();
    }else{
        return undefined;
    }
}

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