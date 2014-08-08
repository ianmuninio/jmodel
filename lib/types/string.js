'use strict';

/**
 * Module Dependencies
 */
var Type = require('../type');
var Util = require('util');

/**
 * Data type for string.
 * 
 * @param {String} key
 * @param {Object} opts
 * @returns {Type}
 */
function StringType(key, opts) {
    Type.call(this, key, opts);
}

/**
 * Extending the @Abstract Type constructor.
 */
Type.extend(StringType);

/**
 * Returns the string value of the value.
 * 
 * @param {Object} value
 * @returns {Object}
 * @throws {JModelError}
 */
StringType.prototype.validate = function(value) {
    if (typeof value !== 'string') {
        if (value === null) {
        } else {
            if (value === undefined) {
                if (this.opts.hasOwnProperty('default')) {
                    if (typeof this.opts.default === 'function') {
                        value = this.opts.default();
                    } else {
                        value = this.opts.default;
                    }
                }
            }

            if (value !== null && value !== undefined) {
                value = value.toString();
            }
        }
    }

    switch (value) {
        case undefined:
            value = null;
        case null:
            if (!this.opts.nullable) {
                this.throwError('Value cannot be null');
            }
            break;
        case '':
            if (!this.opts.empty) {
                this.throwError('Value cannot be empty');
            }
            break;
        default:
            if (this.opts.lowercase && value !== value.toLowerCase()) {
                this.throwError('Value must be in lowercase');
            }

            if (this.opts.uppercase && value !== value.toUpperCase()) {
                this.throwError('Value must be in uppercase');
            }

            if (this.opts.minLength && value.length < this.opts.minLength) {
                this.throwError('Minimum length is ' + this.opts.minLength);
            }

            if (this.opts.maxLength && value.length > this.opts.maxLength) {
                this.throwError('Maximum length is ' + this.opts.maxLength);
            }
    }

    return value;
};

/**
 * Module Exports
 */
module.exports = StringType;