'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');
var AttributeValidator = require('./attribute_validator');

/**
 * Static Local Variables
 */
var models = { };

/**
 * Data Type Factory Class
 */
exports.DataType = require('./types/');

/**
 * Property Factory Class
 */
exports.Property = require('./property/');

/**
 * Class representation of attributes.
 */
exports.Model = require('./model');

/**
 * Generates a version 4 or 5 UUID.
 * 
 * @param {Scalar}
 * @return {String}
 */
exports.UUID = require('./uuid').UUID;

/**
 * Return a create model.
 * 
 * @param {String} collectionName
 * @param {Object} attributes
 * @returns {Model}
 */
exports.createModel = function(collectionName, attributes) {
    function Model() {
        var args = Array.prototype.slice.apply(arguments);

        args.unshift(attributes);
        args.unshift(collectionName);

        exports.Model.apply(this, args);
    }

    Util.inherits(Model, exports.Model);

    Model.collectionName = collectionName;
    Model.idAttribute = exports.Model.getId(attributes);
    Model.attributes = AttributeValidator.validate(attributes);

    models[collectionName] = Model;

    return Model;
};

exports.Error = require('./error');

/**
 * Return the cache Model.
 * 
 * @param {String} name
 * @returns {Model}
 */
exports.model = function(name) {
    return models[name];
};