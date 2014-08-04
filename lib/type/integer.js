'use strict';

/**
 * Module Dependencies
 */
var JModelError = require('../error');

/**
 * Validates the val.
 * 
 * @param {Number} val
 * @param {Function} callback
 */
exports.validate = function(val, callback) {
    val = parseFloat(val);

    if (isNaN(val)) {
        return callback(new JModelError('Invalid integer value'));
    } else if (val.toFixed(0).toString() !== val.toString()) {
        return callback(new JModelError('Value is a float'));
    }
    
    callback();
};