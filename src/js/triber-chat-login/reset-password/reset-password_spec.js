'use strict';

describe('resetPassword', function() {
    var warningServiceMock = {
        warn: function() {}
    }, successServiceMock = {
        success: function() {}
    }, errorServiceMock = {
        error: function() {}
    };
    describe('ResetPasswordController', function() {

        var $controller, $httpBackend, resetPasswordController;

        beforeEach(module('resetPassword'));

        beforeEach(inject(function(_$controller_, _$httpBackend_) {
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
        }));

        beforeEach(function() {
            resetPasswordController = $controller('ResetPasswordController', {
                WarningService: warningServiceMock,
                SuccessService: successServiceMock,
                ErrorService: errorServiceMock
            });
            resetPasswordController.resetPasswordForm = {

            };
            resetPasswordController.email = 'email';
        });

        describe('init', function() {
            it('initialize variables', function() {
                expect(resetPasswordController.submitAttempted).toEqual(false);
            });
        });
        describe('resetPassword', function() {
            it('should display a warning when the form is not valid', function() {
                spyOn(warningServiceMock, 'warn');
                resetPasswordController.resetPasswordForm.$invalid = true;

                resetPasswordController.resetPassword();

                expect(warningServiceMock.warn).toHaveBeenCalled();
                expect(warningServiceMock.warn).toHaveBeenCalledWith('Please correct the reset password form.');
                expect(resetPasswordController.submitAttempted).toEqual(true);
            });
            it('should display success message when password reset requested', function() {
                spyOn(successServiceMock, 'success');
                $httpBackend.expectPOST('/reset-password', {email:  'email'}).respond(200);

                resetPasswordController.resetPassword();

                expect(resetPasswordController.resetting).toEqual(true);

                $httpBackend.flush();

                expect(resetPasswordController.resetting).toEqual(false);
                expect(resetPasswordController.submitAttempted).toEqual(true);
                expect(successServiceMock.success).toHaveBeenCalled();
                expect(successServiceMock.success).toHaveBeenCalledWith('Reset password successful, you will receive an email.' );
            });
            it('should handle error when password request failed', function() {
                spyOn(errorServiceMock, 'error');
                $httpBackend.expectPOST('/reset-password', {email:  'email'}).respond(500, {errorCode: 'error'});

                resetPasswordController.resetPassword();

                expect(resetPasswordController.resetting).toEqual(true);

                $httpBackend.flush();

                expect(resetPasswordController.resetting).toEqual(false);
                expect(resetPasswordController.submitAttempted).toEqual(true);
                expect(errorServiceMock.error).toHaveBeenCalled();
                expect(errorServiceMock.error).toHaveBeenCalledWith('error');
            });

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });

    describe('ConfirmResetPasswordController', function() {
        var $controller, $httpBackend, confirmResetPasswordController;

        var $stateMock = {
            go: function() {}
        }, $stateParamsMock = {
            resetPasswordId: 'resetPasswordId'
        };

        beforeEach(module('resetPassword'));

        beforeEach(inject(function(_$controller_, _$httpBackend_) {
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
        }));

        beforeEach(function() {
            confirmResetPasswordController = $controller('ConfirmResetPasswordController', {
                WarningService: warningServiceMock,
                SuccessService: successServiceMock,
                ErrorService: errorServiceMock,
                $state: $stateMock,
                $stateParams: $stateParamsMock
            });
            confirmResetPasswordController.confirmResetPasswordForm = {

            };
            confirmResetPasswordController.password = 'password';
        });
        describe('init', function() {
            it('initialize variables', function() {
                expect(confirmResetPasswordController.submitAttempted).toEqual(false);
            });
        });
        describe('confirmResetPassword', function() {
            it('should display a warning when the form is not valid', function() {
                spyOn(warningServiceMock, 'warn');
                confirmResetPasswordController.confirmResetPasswordForm.$invalid = true;

                confirmResetPasswordController.confirmResetPassword();

                expect(warningServiceMock.warn).toHaveBeenCalled();
                expect(warningServiceMock.warn).toHaveBeenCalledWith('Please correct the confirm password form.');
            });
            it('should display success message when password reset confirmed', function() {
                spyOn(successServiceMock, 'success');
                spyOn($stateMock, 'go');
                $httpBackend.expectPOST('/reset-password/resetPasswordId', {password:  'password'}).respond(200);

                confirmResetPasswordController.confirmResetPassword();
                $httpBackend.flush();

                expect(confirmResetPasswordController.submitAttempted).toEqual(true);
                expect(successServiceMock.success).toHaveBeenCalled();
                expect(successServiceMock.success).toHaveBeenCalledWith('Password confirmed.');
                expect($stateMock.go).toHaveBeenCalled();
                expect($stateMock.go).toHaveBeenCalledWith('login');
            });
            it('should handle error when password reset failed', function() {
                spyOn(errorServiceMock, 'error');
                $httpBackend.expectPOST('/reset-password/resetPasswordId', {password:  'password'}).respond(500, {errorCode: 'errorCode'});

                confirmResetPasswordController.confirmResetPassword();
                $httpBackend.flush();

                expect(confirmResetPasswordController.submitAttempted).toEqual(true);
                expect(errorServiceMock.error).toHaveBeenCalled();
                expect(errorServiceMock.error).toHaveBeenCalledWith('errorCode');
            });

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });
});