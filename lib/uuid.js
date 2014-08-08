'use strict';

/**
 * Module Dependencies
 */
var Crypto = require('crypto');

/**
 * Generates a version 4 or 5 UUID.
 * 
 * @param {Scalar}
 * @return {String}
 */
exports.UUID = function(str) {
    var buffer;
    var version;

    if (str === undefined) {
        version = 0x40; // version 4
        buffer = Crypto.randomBytes(16); // crypto random bytes
    } else if (typeof str !== 'string') {
        throw new TypeError('First argument needs to be a string or undefined');
    } else {
        version = 0x50; // version 5

        // digest the selected hash algorithm
        var hashAlgorithm = Crypto.createHash('sha1');
        buffer = hashAlgorithm.update(str).digest();
    }

    // read the buffers as 8-bit signed integer
    var data = [];
    for (var idx = 0; idx < 16; idx++) {
        data.push(buffer.readInt8(idx));
    }

    data[6] &= 0x0f; // clear version
    data[6] |= version; // set the version
    data[8] &= 0x3f; // clear variant
    data[8] |= -0x80; // set to IETF variant (8, 9, A or B)

    // creates a empty buffers
    var msb = new Buffer(8);
    var lsb = new Buffer(8);

    // alternate algorithm using hex pushing rather than binary shifting
    for (var idx = 0; idx < 8; idx++) {
        for (var sIdx = idx; sIdx > 0; sIdx--) {
            msb[8 - (sIdx + 1)] = msb[8 - sIdx];
        }

        msb[7] = data[idx] & 0xff;
    }

    for (var idx = 8; idx < 16; idx++) {
        for (var sIdx = idx; sIdx > 8; sIdx--) {
            lsb[16 - (sIdx + 1)] = lsb[16 - sIdx];
        }

        lsb[7] = data[idx] & 0xff;
    }

    // UUID Pattern:
    // xxxxxxxx-xxxx-xxxx-yyyy-yyyyyyyyyyyy
    // where x = most sigbits and y = least sigbits
    var uuid = '';
    uuid += msb.toString('hex', 0, 4);
    uuid += '-';
    uuid += msb.toString('hex', 4, 6);
    uuid += '-';
    uuid += msb.toString('hex', 6, 8);
    uuid += '-';
    uuid += lsb.toString('hex', 0, 2);
    uuid += '-';
    uuid += lsb.toString('hex', 2, 8);

    return uuid;
};