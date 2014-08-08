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
function DateTimeType(key, opts) {
    Type.call(this, key, opts);
}

/**
 * Extending the @Abstract Type constructor.
 */
Type.extend(DateTimeType);

/**
 * Returns the date value of the value.
 * 
 * @param {Object} value
 * @returns {Object}
 * @throws {JModelError}
 */
DateTimeType.prototype.validate = function(value) {
    if (typeof value !== 'date') {
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
                value = new Date(value);
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
        default:
            if (!value.toJSON()) {
                this.throwError('Invalid date time');
            }

            value = value.toISOString();
    }

    return value;
};

/**
 * Module Exports
 */
module.exports = DateTimeType;