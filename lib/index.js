'use strict';

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
 * @param {String} name
 * @param {Object} attributes
 * @returns {Model}
 */
exports.createModel = function(name, attributes) {
    var model = new exports.Model(name, attributes);

    models[name] = model;

    return model;
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