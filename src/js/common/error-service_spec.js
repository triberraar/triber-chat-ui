'use strict';

describe('error-service', function() {

    var errorService;

    var toasterMock = {
        pop: function() {},
        clear: function() {}
    };

    beforeEach(module('errorService'));

    beforeEach(module(function ($provide) {
        $provide.value('toaster', toasterMock);
    }));

    beforeEach(inject(function(_ErrorService_) {
        errorService = _ErrorService_;
    }));

    describe('error', function() {
        it('should pop an error', function() {
            spyOn(toasterMock, 'pop');

            errorService.error('body', 'timeout', 'toastId');

            expect(toasterMock.pop).toHaveBeenCalled();
            expect(toasterMock.pop).toHaveBeenCalledWith({
                type : 'error',
                body : 'body',
                timeout: 'timeout',
                bodyOutputType: 'trustedHtml',
                toastId : 'toastId'
            });
        });

        it('should set body to unkown error when no body provided', function() {
            spyOn(toasterMock, 'pop');

            errorService.error();

            expect(toasterMock.pop).toHaveBeenCalled();
            expect(toasterMock.pop).toHaveBeenCalledWith({
                type : 'error',
                body : 'Unknown error.',
                timeout: undefined,
                bodyOutputType: 'trustedHtml',
                toastId : undefined
            });
        });
    });
    describe('clear', function() {
        it('should clear popped error', function() {
            spyOn(toasterMock, 'clear');

            errorService.clear('toastId');

            expect(toasterMock.clear).toHaveBeenCalled();
            expect(toasterMock.clear).toHaveBeenCalledWith(undefined, 'toastId');
        });
    });
});