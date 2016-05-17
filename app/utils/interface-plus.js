/**
 * Created by daniel on 16/5/14.
 */

'use strict'
var fs = require('fs');
var path = require("path");
var walk = require('walk');
var extend = require('node.extend');
var jsonfile = require('jsonfile');
var config = require('../../config/config');
jsonfile.spaces = 4;
function init() {
    var filePath = path.join(__dirname, '../../config/interface/modules');
    var commonJsonPath = path.join(filePath, '../interface-common.json');
    var interfacePath = path.join(filePath, '../interface.json');
    var interfaces = [];
    var options = {
        listeners: {
            file: function (root, fileStats, next) {
                var data = fs.readFileSync(path.join(filePath, fileStats.name), 'utf-8');
                var json = [];
                try {
                    json = JSON.parse(data);
                } catch (err) {
                    console.log(err);
                    console.log('[ERROR]' + fileStats.name + '存在问题，并未加载，请更改代码');
                    process.exit();
                }


                console.log('[INFO]' + fileStats.name + '加载完成，接口有' + json.length + '个')
                json.forEach(function (val, index) {
                    var exist = false;
                    val.urls.prod = config.backendHost + val.urls.prod;

                    // 以ID为标识符，后来者为准
                    interfaces.forEach(function (val1, index1) {
                        if (val1.id == val.id) {
                            exist = true;
                            interfaces[index1] = val;
                        }
                    });

                    if (!exist) {
                        interfaces.push(val);
                    }
                });

                next();

            }, errors: function (root, nodeStatsArray, next) {
                console.log('[ERROR]读取文件失败');
                next();
            }, end: function () {
                var object = jsonfile.readFileSync(commonJsonPath);
                object.interfaces = interfaces;
                console.log('[INFO]接口全部完成,共' + interfaces.length + '个');
                jsonfile.writeFileSync(interfacePath, object);
            }
        }
    };

    console.log('开始加载独立Interface...')
    walk.walkSync(filePath, options);
}

module.exports = {
    init: init
}