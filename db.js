const mongoose = require('mongoose');

const options = { promiseLibrary: require('bluebird') ,server: { socketOptions: { keepAlive: 1 } } };
let config = require('./config/config');
var connection = undefined;

function connect () {
    if (undefined == connection) {
        var connection = mongoose.connect(config.db.uri, options).connection;
        return connection;
    }else{
        return connection;
    }
}

exports.connect = connect;