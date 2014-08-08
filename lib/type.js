'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');
var JModelError = require('./error');

/**
 * @Abstract
 * 
 * Abstract class of data types.
 * 
 * @param {String} key
 * @param {Object} opts
 * @returns {Type}
 */
function Type(key, opts) {
    this.key = key;
    this.opts = opts || { };
}

/**
 * Inherits the prototype methods of constructor#Type into another
 * constructor.
 * 
 * @param {Class} constructor
 */
Type.extend = function(constructor) {
    Util.inherits(constructor, Type);
};

/**
 * @Abstract
 * 
 * Returns the true value afted the value is validated.
 * 
 * @param {Object} value
 * @returns {Object}
 */
Type.prototype.validate = function(value) {
};

/**
 * Forcely throws an error.
 * 
 * @param {String} message
 * @throws {JModelError}
 */
Type.prototype.throwError = function(message) {
    throw new JModelError({ message : message, propertyName : this.key });
};

/**
 * Module Exports
 */
module.exports = Type;