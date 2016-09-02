'use strict';

describe('successService',function() {
    var successService;

    var toasterMock = {
        pop: function() {}
    };

    beforeEach(module('successService'));

    beforeEach(module(function($provide) {
        $provide.value('toaster', toasterMock);
    }));

    beforeEach(inject(function(SuccessService) {
        successService = SuccessService;
    }));

    describe('success', function() {
        it('should display a success message', function() {
            spyOn(toasterMock, 'pop');

            successService.success('body', 'timeout');

            expect(toasterMock.pop).toHaveBeenCalled();
            expect(toasterMock.pop).toHaveBeenCalledWith({
                type : 'success',
                body : 'body',
                timeout: 'timeout',
                bodyOutputType: 'trustedHtml'
            });
        });
    });
});