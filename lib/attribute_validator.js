'use strict';

/**
 * Module Exports
 */
var Types = require('./types/');
var JModelError = require('./error');

/**
 * Validates the attributes.
 * 
 * @param {Object} attributes
 * @returns {Object}
 */
exports.validate = function(attributes) {
    var newAttributes = { };

    var keys = Object.keys(attributes);

    if (keys.length === 0) {
        throw new JModelError({ message : 'Invalid model attributes' });
    }

    keys.forEach(function(key) {
        var attribute = attributes[key];
        var type;
        var opts = { };

        if (Array.isArray(attribute)) {
            attribute = attribute.slice(0);
            type = attribute.shift();
            opts.nullable = !attribute.shift();
            opts.default = attribute.shift();
        } else if (typeof attribute === 'object') {
            type = attribute.type;

            var keys = Object.keys(attribute);
            var typeIdx = keys.indexOf(type);

            if (typeIdx !== -1) {
                keys.splice(typeIdx, 1);
            }

            keys.forEach(function(key) {
                opts[key] = attribute[key];
            });
        } else if (typeof attribute === 'string') {
            type = attribute;
        }
        
        var attributeType = Types.createDataType(type, key, opts);

        newAttributes[key] = attributeType;
    });

    return newAttributes;
};
