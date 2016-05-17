#!/usr/bin/env node
'use strict';
var app = require('../app'),
    graceful = require('graceful');

var config = require('../config/config');


var server = app.listen(config.port, function() {
    console.log('[INFO] Server listening on port ' + server.address().port);
});

graceful({
    server: server,
    killTimeout: 30 * 1000,
    error: function(err, throwErrorCount) {
        if (err.message) {
            err.message +=
                ' (uncaughtException throw ' + throwErrorCount +
                ' times on pid:' + process.pid + ')';
        }
        console.error(err);
    }
});
