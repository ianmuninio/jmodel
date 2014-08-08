'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');

/**
 * JModel Error Class
 * 
 * @param {Object} obj
 * @returns {JModelError}
 */
function JModelError(obj) {
    this.message = obj['message'];
    this.propertyName = obj['propertyName'];

    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
}

/**
 * Inheritance
 */
Util.inherits(JModelError, Error);

/**
 * Default Prototype
 */
JModelError.prototype.name = 'JModelError';

/**
 * Module Exports
 */
module.exports = JModelError;