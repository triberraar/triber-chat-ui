'use strict';

describe('_', function() {

    var _;
    beforeEach(module('_'));

    beforeEach(inject(function(___) {
        _ = ___;
    }));

    it('should return lodash', function() {
        expect(_).toBeDefined();
    });
});