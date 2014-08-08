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
function IntegerType(key, opts) {
    Type.call(this, key, opts);
}

/**
 * Extending the @Abstract Type constructor.
 */
Type.extend(IntegerType);

/**
 * Returns the integer value of the value.
 * 
 * @param {Object} value
 * @returns {Object}
 * @throws {JModelError}
 */
IntegerType.prototype.validate = function(value) {
    if (typeof value !== 'number') {
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
                value = parseFloat(value);
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
            if (isNaN(value)) {
                this.throwError('Value is not a number');
            }

            if (value.toFixed(0).toString() !== value.toString()) {
                this.throwError('Value is not an integer');
            }

            if (this.opts.hasOwnProperty('min') && value < this.opts.min) {
                this.throwError('Minimum value is ' + this.opts.min);
            }

            if (this.opts.hasOwnProperty('max') && value > this.opts.max) {
                this.throwError('Maximum length is ' + this.opts.max);
            }
    }

    return value;
};

/**
 * Module Exports
 */
module.exports = IntegerType;