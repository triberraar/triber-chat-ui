'use strict';

describe('login', function() {
    describe('LoginController', function() {
        var $controller, $httpBackend, loginController;

        var $windowMock = {
            location: {}
        }, JWTMock = {
            isValid: function() {},
            clear: function() {},
            save: function() {}
        }, errorServiceMock = {
            clear: function() {},
            error: function() {}
        }, warningServiceMock = {
            warn: function() {}
        };

        beforeEach(module('login'));

        beforeEach(inject(function(_$controller_, _$httpBackend_) {
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
        }));

        function createController() {
           loginController = $controller('LoginController', {
                $window: $windowMock,
                JWT: JWTMock,
                ErrorService: errorServiceMock,
                WarningService: warningServiceMock
            });
            loginController.username = 'username';
            loginController.password = 'password';
            loginController.loginForm = {

            };
        }

        describe('init', function() {
            it('initialize variables', function() {
                createController();

                expect(loginController.submitAttempted).toEqual(false);
            });
            it('should redirect to chat if the users token is still valid', function() {
                spyOn(JWTMock, 'isValid').and.callFake(function() { return true; });

                createController();

                expect($windowMock.location.href).toEqual('/chat.html');
            });
            it('should remove the token if it is invalid', function() {
                spyOn(JWTMock, 'isValid').and.callFake(function() { return false; });
                spyOn(JWTMock, 'clear');

                createController();

                expect(JWTMock.clear).toHaveBeenCalled();
            });
        });
        describe('login', function() {
            beforeEach(createController);

            it('should display a warning when the form is not valid', function() {
                spyOn(errorServiceMock, 'clear');
                spyOn(warningServiceMock, 'warn');
                loginController.loginForm.$invalid = true;

                loginController.login();

                expect(errorServiceMock.clear).toHaveBeenCalled();
                expect(warningServiceMock.warn).toHaveBeenCalled();
                expect(warningServiceMock.warn).toHaveBeenCalledWith('Please correct the login form.');
                expect(loginController.submitAttempted).toEqual(true);
            });
            it('should save the new token and redirect to chat when login is successful', function() {
                spyOn(JWTMock, 'save');
                $httpBackend.expectPOST('/login', {username: 'username', password: 'password'}).respond(200, {}, {authorization: 'Bearer:token'});

                loginController.login();
                $httpBackend.flush();

                expect(JWTMock.save).toHaveBeenCalled();
                expect(JWTMock.save).toHaveBeenCalledWith('token');
                expect($windowMock.location.href).toEqual('/chat.html');
                expect(loginController.submitAttempted).toEqual(true);
            });
            it('should handle error when login is not successful', function() {
                spyOn(errorServiceMock, 'error');

                $httpBackend.expectPOST('/login', {username: 'username', password: 'password'}).respond(500);

                loginController.login();
                $httpBackend.flush();

                expect(errorServiceMock.error).toHaveBeenCalled();
                expect(errorServiceMock.error).toHaveBeenCalledWith('Login failed, please correct the login form and try again.', 0, 'loginFailedToastId' );
                expect(loginController.submitAttempted).toEqual(true);
            });

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });
    });
});