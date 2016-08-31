'use strict';

describe('register', function () {
    describe('RegisterController', function () {

        var $controller, $httpBackend, registerController;

        var vcRecaptchaServiceMock = {
            reload: function() {}
        }, errorServiceMock = {
            error: function() {}
        }, warningServiceMock = {
            warn: function() {}
        }, successServiceMock = {
            success: function() {}
        };

        beforeEach(module('register'));

        beforeEach(inject(function(_$controller_, _$httpBackend_) {
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
        }));

        beforeEach(function() {
            registerController = $controller('RegisterController', {
                vcRecaptchaService: vcRecaptchaServiceMock,
                ErrorService: errorServiceMock,
                WarningService: warningServiceMock,
                SuccessService: successServiceMock
            });
            registerController.registerForm = {

            };
            registerController.username = 'username';
            registerController.email = 'email';
            registerController.password = 'password';
            registerController.recaptcha = 'recaptcha';
        });

        describe('init', function () {
            it('should initialize variables', function () {
                expect(registerController.submitAttempted).toEqual(false);
                expect(registerController.registering).toEqual(false);
            });
        });
        describe('register', function() {
            it('should display a warning when the form is not valid', function() {
                spyOn(warningServiceMock, 'warn');
                registerController.registerForm.$invalid = true;

                registerController.register();

                expect(warningServiceMock.warn).toHaveBeenCalled();
                expect(warningServiceMock.warn).toHaveBeenCalledWith('Please correct the register form.');
                expect(registerController.submitAttempted).toEqual(true);
            });
            it('should display success when registration goes successful in the backend', function() {
                spyOn(successServiceMock, 'success');
                $httpBackend.expectPOST('/register', {username: 'username', password: 'password', email: 'email', captcha: 'recaptcha'}).respond(200);

                registerController.register();

                expect(registerController.registering).toEqual(true);

                $httpBackend.flush();

                expect(successServiceMock.success).toHaveBeenCalled();
                expect(successServiceMock.success).toHaveBeenCalledWith('Registration successful, you will receive an email.');
                expect(registerController.registering).toEqual(false);
                expect(registerController.submitAttempted).toEqual(true);
            });
            it('should handle error when registration fails', function() {
                spyOn(vcRecaptchaServiceMock, 'reload');
                spyOn(errorServiceMock, 'error');
                $httpBackend.expectPOST('/register', {username: 'username', password: 'password', email: 'email', captcha: 'recaptcha'}).respond(500, {errors: ['error1', 'error2']});
                registerController.widgetId = 'widgetId';

                registerController.register();

                expect(registerController.registering).toEqual(true);

                $httpBackend.flush();

                expect(registerController.registering).toEqual(false);
                expect(vcRecaptchaServiceMock.reload).toHaveBeenCalled();
                expect(vcRecaptchaServiceMock.reload).toHaveBeenCalledWith('widgetId');
                expect(registerController.recaptcha).toBeUndefined();
                expect(errorServiceMock.error).toHaveBeenCalled();
                expect(errorServiceMock.error).toHaveBeenCalledWith('error1<br>error2<br>');
                expect(registerController.submitAttempted).toEqual(true);
            });

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
        describe('recaptchaCreated', function() {
            it('should set the widget', function() {
                registerController.recaptchaCreated('recaptcha');

                expect(registerController.recaptcha).toEqual('recaptcha');
            });
        });
        describe('refreshRecaptcha', function() {
            it('should refresh the widget', function() {
                spyOn(vcRecaptchaServiceMock, 'reload');
                registerController.recaptcha = 'recaptcha';
                registerController.widgetId = 'widgetId';

                registerController.refreshRecaptcha();

                expect(registerController.recaptcha).toBeUndefined();
                expect(vcRecaptchaServiceMock.reload).toHaveBeenCalled();
                expect(vcRecaptchaServiceMock.reload).toHaveBeenCalledWith('widgetId');
            });
        });
    });
});