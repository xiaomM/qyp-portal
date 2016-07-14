const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/qyp';
const options = { promiseLibrary: require('bluebird') ,server: { socketOptions: { keepAlive: 1 } } };
var connection = undefined;

function connect () {
    if (undefined == connection) {
        var connection = mongoose.connect(uri, options).connection;
        return connection;
    }else{
        return connection;
    }
}

exports.connect = connect;