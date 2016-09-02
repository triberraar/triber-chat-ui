'use strict';

describe('activateRegistration', function() {
   describe('ActivateRegistrationController', function() {

       var $controller, $httpBackend, activateRegistrationController;

       var $stateMock = {
            go: function() {}
       }, $stateParamsMock = {
            userId: 'userId'
       }, warningServiceMock = {
            warn: function() {}
       }, errorServiceMock = {
            error: function() {}
       }, successServiceMock = {
            success: function() {}
       };


       beforeEach(module('activateRegistration'));

       beforeEach(inject(function(_$controller_, _$httpBackend_) {
           $controller = _$controller_;
           $httpBackend = _$httpBackend_;
       }));

       beforeEach(function() {
           activateRegistrationController = $controller('ActivateRegistrationController', {
               $state: $stateMock,
               $stateParams: $stateParamsMock,
               WarningService: warningServiceMock,
               ErrorService: errorServiceMock,
               SuccessService: successServiceMock
           });
           activateRegistrationController.activateRegistrationForm = {

           };
       });

       describe('init', function() {
           it('should initialize variables', function() {
                expect(activateRegistrationController.submitAttempted).toEqual(false);
           });
       });
       describe('activateRegistration', function() {
           it('should display a warning when the form is not valid', function() {
               spyOn(warningServiceMock, 'warn');
               activateRegistrationController.activateRegistrationForm.$invalid = true;

               activateRegistrationController.activateRegistration();

               expect(warningServiceMock.warn).toHaveBeenCalled();
               expect(warningServiceMock.warn).toHaveBeenCalledWith('Please correct the activate form.');
               expect(activateRegistrationController.submitAttempted).toEqual(true);
           });
           it('should display succes when registration activated in backend', function() {
               $httpBackend.expectPUT('/user/userId/activate').respond(200);
               activateRegistrationController.password = 'password';
               spyOn(successServiceMock, 'success');
               spyOn($stateMock, 'go');

               activateRegistrationController.activateRegistration();
               $httpBackend.flush();

               expect(successServiceMock.success).toHaveBeenCalled();
               expect(successServiceMock.success).toHaveBeenCalledWith('You are activated');
               expect($stateMock.go).toHaveBeenCalled();
               expect($stateMock.go).toHaveBeenCalledWith('login');
               expect(activateRegistrationController.submitAttempted).toEqual(true);

           });
           it('should handle error when registration activation failed in backend', function() {
               $httpBackend.expectPUT('/user/userId/activate').respond(500, {errorCode: 'errorCode'});
               activateRegistrationController.password = 'password';
               spyOn(errorServiceMock, 'error');

               activateRegistrationController.activateRegistration();
               $httpBackend.flush();

               expect(errorServiceMock.error).toHaveBeenCalled();
               expect(errorServiceMock.error).toHaveBeenCalledWith('errorCode');
               expect(activateRegistrationController.submitAttempted).toEqual(true);
           });

           afterEach(function() {
               $httpBackend.verifyNoOutstandingExpectation();
               $httpBackend.verifyNoOutstandingRequest();
           });
       });
   });
});