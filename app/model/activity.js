'use strict';
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;


/*
var mockJson = {
    "success": true,
    "data": {
        "activityDescription": "<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【活动名称】 </span>初夏里的一抹小清新<span>——</span>天目大峡谷清凉之旅\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【活动路线】</span><u>&nbsp;</u>杭州<span>-</span>藻溪镇<span>-</span>天目山大峡谷售票口<span>——</span>游玩<span>——</span>景区出口<span>——</span>返回杭州<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【行程安排】</span> 5.18（周六） 08:30\n华星时代广场上车——10:30景区门口——游玩，戏水，拍照，午餐，徒步，皮筏冲浪，景区还有其他自费项目<span>——14</span>：<span>00</span>至火山口观景——16:00出口，乘车返杭——17:30抵达杭州\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"margin-left:8.05pt;text-indent:-8.05pt;\">\n\t<span style=\"color:#337FE5;\">【活动强度】</span> 低端休闲，徒步距离约<span>8</span>公里，累计上升高度约<span>200</span>米不详，耗时约<span>5</span>小时。<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【</span><span style=\"color:#337FE5;\">出行方式】</span> 包车（正规公司大巴），<span>37</span>座空调车，车费<span>1300</span>元，费用<span>AA</span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【报名人数】</span> 36人（报名人数低于<span>25</span>，取消活动）<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"margin-left:96pt;text-indent:-96pt;\">\n\t<span style=\"color:#337FE5;\">【活动经费】</span> 1、往返车费人均约<span>36</span>元 （根据实际报名人数<span>AA</span>），另需承担司机午餐以及景区停车费）<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"margin-left:96pt;text-indent:-96pt;\">\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2、景区门票：天目山大峡谷挂牌票<span>110</span>元<span> +</span>皮筏冲浪票<span>30</span>元（仅为游乐场似的体验项目，与长距离漂流不同）。<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 以上共小计<span>66</span>元（走团体优惠票渠道）<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"margin-left:96pt;text-indent:-96pt;\">\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3、午餐自备零食<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:78pt;\">\n\t4、户外保险自行自愿购买。<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:96pt;\">\n\t公共支出总计：<span>110</span>元<span>/</span>人<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【付费说明】 </span>AA制，费用明细公开<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【参考天气】</span> 14~22℃，北微风，多云，阵雨（请姑娘们注意防晒防雨）<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【领</span><span style=\"color:#337FE5;\">&nbsp;&nbsp;&nbsp; </span><span style=\"color:#337FE5;\">队】</span> 玄贝（三文余）：<span>13235713668</span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【</span><span style=\"color:#337FE5;\"> Q&nbsp; Q </span><span style=\"color:#337FE5;\">群】 </span>联络群：174870767（后续消息通知、咨询及下载照片专用渠道），报名请加群并改好昵称，以昵称报名。<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【报名方式】</span>编辑邮件内容：<span>“</span>昵称<span>+</span>性别<span>+</span>电话<span>+</span>我要参加！<span>”</span>，以<span>“</span>昵称<span>+</span>性别<span>+</span>报名<span>”</span>为主题，发送邮件至领队：<span><a href=\"mailto:648406926@qq.com\" target=\"_blank\">648406926@qq.com</a></span>。收到回复确认，即报名成功！<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"margin-left:54pt;text-indent:-54pt;\">\n\t注意：<span>1</span>、出发前，请随时<span>check</span>你的邮件，若有最新变动我将已邮件方式通知大家！<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:36pt;\">\n\t2、你发送的邮件将用作接收活动中其他驴友拍摄的照片！<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:36pt;\">\n\t3、若遇恶劣天气、突发事件等不可抗拒因素，导致活动受阻，领队有权取消活动，然后提前一天通知大家。<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【报名截止】</span> 本周四<span>16:00</span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【退出机制】</span>报名成功后：一、不得迟到；二、不得放鸽子。<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t若有事不能准时参加，需在领队垫付相关费用前提出（一般报名截止，即垫付相关费用）；否则需自己找到替补，如果没有找到替补，则需<span>A</span>如车费等垫付费用。如果没有产生垫付费用，则免<span>A</span>。<span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t&nbsp;\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<b><span style=\"color:#337FE5;\">——————————————</span></b><b><span style=\"color:#337FE5;\">注意事项</span><span style=\"color:#337FE5;\">————————————————</span></b>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【报名须知】</span><span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:24pt;\">\n\t1、自带饮用水（建议1.0～1.5升/人/天）、相机、双肩包、一顿午餐；\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:24pt;\">\n\t2、请穿登山鞋或厚底防滑的旅游鞋；防晒霜、遮阳帽、手杖、护膝（不严格要求）等； <span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:24pt;\">\n\t3、必须具备团队意识以及团结、友爱、奉献的精神，遵守团队纪律，须服从领队的安排，不得擅离队伍，否则，责任自负；\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:24pt;\">\n\t4、有指南针、GPS辅助设备等的同学请尽量携带，请男士们事先查看攻略，发生突发情况时大家共同想办法解决问题；\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:24pt;\">\n\t5、严禁有心脏病、脑血管、精神病、高血压、个性极端等疾病或心态的人士参加；\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"text-indent:24pt;\">\n\t6、活动允许带外挂，代他人报名者，应了解被代替报名者的情况并对其负责；\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t【户外活动责任豁免协议】\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t本次活动为非赢利<span>AA</span>自助活动，非商业活动，自愿参加，全程遵循<span>“AA</span>、自助、互助、环保<span>”</span>的原则。参与者需理解、同意此协议，方可参加本次活动。\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t1、我知道活动的策划者只是活动的联系人，并不是职业的领队、向导或有许可证的急救人员，他和同行的队友们可能并没有参加过户外领队的课程、急救（包括野外）等专业培训，他们并不对我的安全负法律和经济责任；\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t2、凡参加者均视为具有完全民事行为能力人。通过阅读此协议，你已经完全理解以下条款和内容，你放弃了某些法律权利，包括向活动策划人和同队成员提起诉讼的权利：\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t3、户外活动可能包括在崎岖地带和恶劣天气中进行活动，可能远离救助和医疗服务。当参加户外活动时，我有可能遇到风险而受到伤害，甚至死亡，这些风险包括往返交通、跌坠、落石、冰崩、雪崩、闪电、过河、冻伤、刺伤、野兽袭击及其它风险。我清楚获知活动联系人无法全面预见该活动中所有的风险，如果发生意外，所有救援和医疗的费用将由我自己承担，免除此次活动联系人和同行伙伴们的法律责任。\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t4、参加活动前，我已经了解了活动中可能存在的风险以及自身身体和精神状况；活动过程中，我有权询问活动联系人以要求其解释任何我觉得有疑问的决定，如果我认为安全风险较大，有权立刻退出活动。\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t5、我清楚地获知此次活动的成员都和本人一样是自愿的参与者，其并不承担法律责任、意外保险和健康保险等，我愿意承担活动中潜在的风险，并了解自行购买保险的意义，以防潜在的风险。\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t4、我没有法律上的责任去帮助他人，任何其他成员也没有法律上的责任来帮助我。但在同伴需要帮助的时候，在确保自身安全的条件下，我会尽力帮助我的同伴。\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t5、我已经阅读和理解以上声明，理解参加此次户外活动相关的风险，自愿参加本次活动并同意以上声明，承担由于选择参加此次户外活动而产生的全部责任。集合出发起，此责任豁免协议立即生效。\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t&nbsp;\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【景点介绍】</span>\n</p>\n<p class=\"MsoNormal\" align=\"left\" style=\"background:white;\">\n\t&nbsp;临安天目大峡谷旅游景区，地处浙江临安，紧邻原始森林大树王国西天目山。石谷地貌奇特，野趣浓郁，以森林、奇石、碧潭、飞瀑、火山口、冰川遗迹构成一条壮观的山野长廊。谷内千姿百态的巨石比比皆是，自天目山上直泻谷底。天然的迎客石、官帽石、青蛙石、飞来石，惟妙惟肖，呼之欲出。<span>10</span>吨至<span>4000</span>吨的巨石有<span>5000</span>多块。最高的官帽石<span>30</span>多米，面积最大的八仙台能站立<span>100</span>余人，最重的飞来石<span>3987</span>吨。著名导演谢晋游览后挥毫写下了<span>“</span>中华第一石谷<span>”</span>。文坛泰斗金庸看了石谷后写下了<span>“</span>石谷有灵气，灵石成山谷<span>”</span>。\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\">【景点图片】</span><span></span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\"><img src=\"/public/img/upload/93a87c50-352a-11e6-9d59-651162de4720.jpg\" alt=\"\" /><br />\n</span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\"><img src=\"/public/img/upload/992cd6d0-352a-11e6-9d59-651162de4720.jpg\" alt=\"\" /><br />\n</span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\"><img src=\"/public/img/upload/9eb3a250-352a-11e6-9d59-651162de4720.jpg\" alt=\"\" /><br />\n</span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\"><img src=\"/public/img/upload/a43fec10-352a-11e6-9d59-651162de4720.jpg\" alt=\"\" /><br />\n</span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\"><img src=\"/public/img/upload/aa4cfe90-352a-11e6-9d59-651162de4720.jpg\" alt=\"\" /><br />\n</span>\n</p>\n<p class=\"MsoNormal\" align=\"left\">\n\t<span style=\"color:#337FE5;\"><img src=\"/public/img/upload/b094a910-352a-11e6-9d59-651162de4720.jpg\" alt=\"\" /><br />\n</span>\n</p>",
        "activityId": 16,
        "gmtCreate": "Jun 18, 2016 4:00:19 PM",
        "gmtModified": "Jun 18, 2016 4:00:19 PM",
        "activityTitle": "第2站：天目大峡谷",
        "startTime": "2013-05-18 08:00:00",
        "endTime": "2013-05-18 21:00:00",
        "destination": "临安",
        "creator": "玄贝",
        "minPeopleSize": 30,
        "maxPeopleSize": 30,
        "budget": "200",
        "deposit": "100",
        "dutyList": "财务|唱歌",
        "boardList": "08:00淘宝城",
        "paymentUrl": "无"
    }
};
*/
/**
 * User schema
 */

var ActivitySchema = new Schema({
    activityDescription: { type: String, default: '' },
    activityId: { type: Number},
    gmtCreate: { type: Date, default: new Date() },
    gmtModified: { type: Date, default: new Date() },
    activityTitle: {type: String},
    startTime: {type:Date},
    endTime: {type:Date},
    destination:{type:String},
    creator:{type:String},
    minPeopleSize:{type:Number},
    maxPeopleSize:{type:Number},
    budget: {type:String},
    deposit: {type:Number},
    dutyList: {type:String},
    boardList: {type:String},
    paymentUrl: {type:String},
    wxPageUrl:{type:String}//微信图文消息URL
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

ActivitySchema.methods.countActivity = function () {
    return  mongoose.model('Activity').count({});
}

ActivitySchema.statics.saveActivity = function* (activity) {
    console.log("befor add activityId="+activity.activityId);
    if(activity.activityId == undefined){
        activity.activityId = ((yield ActivityModel.maxActivityId())+1);
    }
    console.log("after add activityId="+activity.activityId);
    return yield activity.save();
}

ActivitySchema.statics.getActivityByActivityId = function* (id) {
    let activityEntity =  (yield ActivityModel.findOne({activityId:id}).exec());
    console.log('activityEntity = '+activityEntity);
    return activityEntity;
}

ActivitySchema.statics.maxActivityId = function* () {
    let maxActivity =  (yield ActivityModel.findOne().sort({activityId:-1}).limit(1).exec());
    if(maxActivity == undefined){
        return 1;
    }
    // let maxActivity = new ActivityModel(maxActivity);
    if(maxActivity.activityId == undefined){
            return 1;
    }
    return maxActivity.activityId;
}

/**
 * Statics
 */

ActivitySchema.static({

});

/**
 * Register
 */

mongoose.model('Activity', ActivitySchema);

let ActivityModel = mongoose.model('Activity');

module.exports=ActivityModel;