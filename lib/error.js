'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');

/**
 * JModel Error Class
 * 
 * @param {String} msg
 * @returns {JModelError}
 */
function JModelError(msg) {
    this.message = msg;

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