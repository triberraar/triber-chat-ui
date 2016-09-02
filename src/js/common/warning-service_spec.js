'use strict';

describe('warningService',function() {
    var warningService;

    var toasterMock = {
        pop: function() {}
    };

    beforeEach(module('warningService'));

    beforeEach(module(function($provide) {
        $provide.value('toaster', toasterMock);
    }));

    beforeEach(inject(function(WarningService) {
        warningService = WarningService;
    }));

    describe('success', function() {
        it('should display a warning message', function() {
            spyOn(toasterMock, 'pop');

            warningService.warn('body', 'timeout');

            expect(toasterMock.pop).toHaveBeenCalled();
            expect(toasterMock.pop).toHaveBeenCalledWith({
                type : 'warning',
                body : 'body',
                timeout: 'timeout',
                bodyOutputType: 'trustedHtml'
            });
        });
    });
});