'use strict';

/**
 * Module Dependencies
 */
var Property = require('./property/');

/**
 * Class representation of attributes.
 * 
 * @param {String} name
 * @param {Object} attributes
 * @returns {Model}
 */
function Model(name, attributes) {
    this.virtuals = { };

    this.name = name;
    this.attributes = attributes;
    this.values = { };
}

/**
 * Creates a virtual property.
 * 
 * @param {String} attributeName
 * @returns {VirtualProperty}
 */
Model.virtual = function(attributeName) {
    var virtualProperty = new Property.VirtualProperty(attributeName, this);
    this.virtuals[attributeName] = virtualProperty;

    return virtualProperty;
};

/**
 * Returns the attributes value.
 * 
 * @param {String} attributeName
 * @returns {Object}
 */
Model.prototype.get = function(attributeName) {
    // return the virtual property getter retured value if the property
    // is a virtual
    if (this.virtuals.hasOwnProperty(attributeName)) {
        return this.virtuals[attributeName].getter(attributeName);
    }

    return this.values[attributeName];
};

/**
 * Sets the attributes value.
 * 
 * @param {String} attributeName
 * @param {Object} value
 * @returns {Model.prototype}
 */
Model.prototype.set = function(attributeName, value) {
    // execute the virtual property setter if the property is a virtual
    if (this.virtuals.hasOwnProperty(attributeName)) {
        return this.virtuals[attributeName].setter(value);
    }

    return this;
};

/**
 * Returns the properties and it's values.
 * 
 * @returns {Object}
 */
Model.prototype.toObject = function() {
    return JSON.parse(JSON.stringify(values));
};

/**
 * Returns the properties and it's values.
 * 
 * @returns {Object}
 */
Model.prototype.toJSON = function() {
    return this.toObject();
};

/**
 * Module Exports
 */
module.exports = Model;