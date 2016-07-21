//本地调试环境配置
var path = require('path');
module.exports = {
    "env":"dev",
    "debug": true,
    "backendHost": '',
    "port": 8081,
    db:{
        uri: 'mongodb://127.0.0.1:27017/qyp-dev'
    },
};