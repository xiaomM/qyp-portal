'use strict';

var Controller = require('../controller/activity-controller');

var prefix = '/activity';

module.exports = function(app){
   
    app.get(prefix + '/detail', Controller.detail);
    app.get(prefix + '/lists', Controller.lists);
    app.get(prefix + '/signup', Controller.signup);
    app.get(prefix + '/aboutus', Controller.signup);
};