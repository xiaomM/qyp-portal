'use strict';
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
/**
 * User schema
 */

var MemberSchema = new Schema({
    nickname: {type:String},// nickname	用户昵称
    phoneNumber: {type:String},
    email: {type:String},
    age: {type:Number},
    sex: {type:String},//sex	用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    isSingle: {type:Boolean},
    openid: {type:String},//openid	用户的唯一标识
    remoteIp:{type:String,default:"127.0.0.1"},
    gmtCreate:{type:Date,default:new Date()},
    province:{type:String},
    city:{type:String},
    country:{type:String},
    headimgurl:{type:String},
    unionid:{type:String}
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

MemberSchema.statics.saveMember = function* (member) {
    console.log('member = '+JSON.stringify(member));
    let result =  yield member.save();
    console.log('result = '+JSON.stringify(result));
};

MemberSchema.statics.getMember = function* (openid) {
    let memberEntity =  (yield MemberModel.findOne({openid:openid}).exec());
    console.log('memberEntity = '+memberEntity);
    return memberEntity;
};

/**
 * Statics
 */

MemberSchema.static({

});

/**
 * Register
 */

mongoose.model('Member', MemberSchema);

let MemberModel = mongoose.model('Member');

module.exports=MemberModel;