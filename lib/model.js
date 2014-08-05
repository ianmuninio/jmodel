'use strict';

/**
 * Module Dependencies
 */
var Property = require('./property/');

/**
 * Class representation of attributes.
 * 
 * @param {String} collectionName
 * @param {Object} attributes
 * @param {Object} values
 * @returns {Model}
 */
function Model(collectionName, attributes, values) {
    this.virtuals = { };

    this.collectionName = collectionName;
    this.idAttribute = Model.getId(attributes);
    this.attributes = attributes;
    this.values = values || { };
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
 * Retuns the id attribute name.
 * 
 * @param {Object} attributes
 * @returns {String}
 */
Model.getId = function(attributes) {
    var idAttribute = null;
    for (idAttribute in attributes) {
        break;
    }

    return idAttribute;
};

/**
 * Returns the attributes value.
 * 
 * @param {String} attributeName
 * @returns {Object}
 */
Model.prototype.get = function(attributeName) {
    if (attributeName === 'id') {
        attributeName = this.idAttribute;
    }

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
    if (attributeName === 'id') {
        attributeName = this.idAttribute;
    }

    if (typeof attributeName === 'object') {
        for (var idx in attributeName) {
            this.set(idx, attributeName[idx]);
        }

        return this;
    }

    // execute the virtual property setter if the property is a virtual
    if (this.virtuals.hasOwnProperty(attributeName)) {
        return this.virtuals[attributeName].setter(value);
    } else if (this.attributes.hasOwnProperty(attributeName)) {
        this.values[attributeName] = value;
    }

    return this;
};

/**
 * Returns the properties and it's values.
 * 
 * @returns {Object}
 */
Model.prototype.toObject = function() {
    return JSON.parse(JSON.stringify(this.values));
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