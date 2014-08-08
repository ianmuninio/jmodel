'use strict';

/**
 * Module Dependencies
 */
var JModelError = require('../error');
var DATA_TYPES = {
    string : require('./string'),
    integer : require('./integer'),
    datetime : require('./datetime')
};

/**
 * Returns the specified created data type.
 * 
 * @param {String} type
 * @param {String} key
 * @param {Object} opts
 * @returns {Type}
 */
exports.createDataType = function(type, key, opts) {
    type = type || '';

    // to ensure the data type is valid
    type = type.toString().toLowerCase();

    if (!DATA_TYPES.hasOwnProperty(type)) {
        throw new JModelError({
            message : 'Invalid data type: ' + type,
            propertyName : key
        });
    }

    return new DATA_TYPES[type](key, opts);
};