'use strict';

/**
 * Module Dependencies
 */
var Property = require('./property/');
var attributeValidator = require('./attribute_validator');

/**
 * An entity is a lightweight persistence domain object.
 * 
 * @param {String} collectionName
 * @param {Object} attributes
 * @param {Object} values
 * @returns {Model}
 */
function Model(collectionName, attributes, values) {
    this.collectionName = collectionName;
    this.idAttribute = Model.getId(attributes);
    this.attributes = attributeValidator.validate(attributes);
    this.values = { };
    this.virtuals = { };

    // initially add the null value from all attributes
    for (var key in this.attributes) {
        this.values[key] = undefined;
    }

    // prevents from modifying values and adding properties
    Object.freeze(this.attributes);

    // prevents from adding new properties
    Object.seal(this.values);

    // sets the initial values
    this.set(values);
}

/**
 * Retuns the id attribute name.
 * 
 * We assumed that the first property in the attributes is the id of the model.
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
 * Creates a virtual property.
 * 
 * @param {String} key
 * @returns {VirtualProperty}
 */
Model.virtual = function(key) {
    var virtualProperty = new Property.VirtualProperty(key, this);
    this.virtuals[key] = virtualProperty;

    return virtualProperty;
};

/**
 * Returns the attributes value.
 * 
 * @param {String} attributeName
 * @returns {Object}
 */
Model.prototype.get = function(attributeName) {
    // we use the idAttribute of the model if the key is id
    if (attributeName === 'id') {
        attributeName = this.idAttribute;
    }

    // return the virtual property getter retured value if the property
    // is a virtual
    if (this.virtuals.hasOwnProperty(attributeName)) {
        this.virtuals[attributeName].getter(attributeName);
        return this;
    }

    return this.values[attributeName];
};

/**
 * Sets the attributes value.
 * 
 * @param {String} key
 * @param {Object} value
 * @param {Object} opts
 * @returns {Model.prototype}
 */
Model.prototype.set = function(key, value, opts) {
    // ignore invalid keys
    if (!key) {
        return this;
    } else if (typeof key === 'object') { // checked if the value is object
        opts = value || { };

        // if setting the same model
        if (key instanceof Model) {
            key = key.values;
        }

        // loop-set the objects to be added
        for (var propKey in key) {
            this.set(propKey, key[propKey], opts);
        }

        return this;
    }

    opts = opts || { };

    // we use the idAttribute of the model if the key is id
    if (key === 'id') {
        key = this.idAttribute;
    }

    // execute the virtual property setter if the property is a virtual
    if (this.virtuals.hasOwnProperty(key)) {
        this.virtuals[key].setter(value);
        return this;
    }

    // don't sets the value if key doesn't exist
    // we need to worry about checking if the key exist even if the
    // 'this.values' is sealed because we are in 'strict mode',
    // it will throw an error if we don't
    if (!this.attributes.hasOwnProperty(key)) {
        return this;
    }

    // we throws an error if the key or value is invalid
    // we use throwing error instead emitting an event for browser
    // compatability
    this.validate(key, value, opts);

    this.values[key] = value;
    return this;
};

/**
 * Returns the true value of the key and value. If the key doesn't exist, it
 * will return undefined instead.
 * 
 * @param {String} key
 * @param {Object} value
 * @param {Object} opts
 * @returns {Object}
 * @throws {JModelError}
 */
Model.prototype.validate = function(key, value, opts) {
    // disregard keys that doesn't exist in the attributes
    if (!this.attributes.hasOwnProperty(key)) {
        return;
    }

    var attribute = this.attributes[key];
    return attribute.validate(value);
};

/**
 * Returns the properties and it's values.
 * 
 * @returns {Object}
 */
Model.prototype.toObject = function() {
    // validate each key values before converting this model to an object
    for (var key in this.values) {
        // we use this.values[key] istead of this.get(key) cause the this#get
        // function is checking for virtuals since we don't need virtual
        // properties for checking
        this.set(key, this.validate(key, this.values[key]));
    }

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