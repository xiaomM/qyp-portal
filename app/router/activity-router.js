'use strict';

var Controller = require('../controller/activity-controller');

var prefix = '/activity';

module.exports = function(app){
    app.get(prefix + '/list', Controller.list);
    app.get(prefix + '/signup', Controller.signup);
};