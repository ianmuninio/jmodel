'use strict';

/**
 * Module Dependencies
 */
var Util = require('util');

/**
 * Static Local Variables
 */
var models = { };

/**
 * Data Type Factory Class
 */
exports.DataType = require('./type/');

/**
 * Property Factory Class
 */
exports.Property = require('./property/');

/**
 * Class representation of attributes.
 */
exports.Model = require('./model');

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

        this.constructor.super_.apply(this, args);
    }

    Util.inherits(Model, exports.Model);

    Model.collectionName = collectionName;
    Model.idAttribute = exports.Model.getId(attributes);

    models[collectionName] = Model;

    return Model;
};

/**
 * Return the cache Model.
 * 
 * @param {String} name
 * @returns {Model}
 */
exports.model = function(name) {
    return models[name];
};