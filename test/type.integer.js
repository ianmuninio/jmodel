/**
 * Module Dependencies
 */
var integer = require('../src/type/integer');

describe('Integer', function() {
    describe('#validate', function() {
        it('should not throw an NaN error', function(done) {
            integer.validate(1, done);
        });

        it('should throw a NaN error', function(done) {
            integer.validate(undefined, function(err) {
                if (err) {
                    return done();
                }

                done(err);
            });
        });

        it('should not throw a non integer value', function(done) {
            integer.validate(1, done);
        });

        it('should throw a non integer value', function(done) {
            integer.validate(1.32, function(err) {
                if (err) {
                    return done();
                }

                done(err);
            });
        });
    });
});