/**
 * Module Dependencies
 */
var JModelError = require('../src/error');
var assert = require('assert');

describe('JModelError', function() {
    describe('#instance', function() {
        it('should equals to Error#instance', function() {
            assert(new JModelError() instanceof Error);
        });
    });
});