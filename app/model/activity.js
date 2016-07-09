
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var ActivitySchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' }
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

ActivitySchema.method({

});

/**
 * Statics
 */

ActivitySchema.static({

});

/**
 * Register
 */

mongoose.model('Activity', ActivitySchema);
