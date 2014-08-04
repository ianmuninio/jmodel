'use strict';

/**
 * Virtual property of Model.
 * 
 * @param {String} name
 * @param {Model} model
 * @returns {VirtualProperty}
 */
function VirtualProperty(name, model) {
    this.name = name;
    this.model = model;
}

/**
 * Set the setter handler binded with model.
 * 
 * @param {Function} setter
 * @returns {VirtualProperty.prototype}
 */
VirtualProperty.prototype.set = function(setter) {
    this.setter = setter.bind(this.model);

    return this;
};

/**
 * Set the getter handler binded with model.
 * 
 * @param {Function} getter
 * @returns {VirtualProperty.prototype}
 */
VirtualProperty.prototype.get = function(getter) {
    this.getter = getter.bind(this.model);

    return this;
};

/**
 * Module Exports
 */
module.exports = VirtualProperty;