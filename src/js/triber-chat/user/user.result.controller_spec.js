'use strict';

describe('user.result.controller', function () {
    var $controller, rootScope, scope, $httpBackend;

    var errorServiceMock = {
        error: function () {
        }
    }, successServiceMock = {
        success: function () {
        }
    }, userRepositoryMock = {
        users: [{id: 1}],
        all: function() {}
    };

    beforeEach(module('user.result.controller'));
    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
        rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));
    var createController = function () {
        scope = rootScope.$new();
        return $controller('UserResultController', {
            $rootScope: rootScope,
            $scope: scope,
            ErrorService: errorServiceMock,
            SuccessService: successServiceMock,
            UserRepository: userRepositoryMock
        });
    };

    describe('init', function () {
        var userResultController;
        beforeEach(function () {
            userResultController = createController();
        });
        it('should set default values', function () {
            expect(userResultController.validating).toEqual(false);
        });
    });
    describe('users', function () {
        var userResultController;
        beforeEach(function () {
            userResultController = createController();
        });
        it('should return the users', function () {
            expect(userResultController.users()).toEqual([{id: 1}]);
        });
    });
    describe('validate', function () {
        var userResultController;
        beforeEach(function () {
            userResultController = createController();
        });
        it('should do nothing when already validating', function () {
            userResultController.validating = true;
            userResultController.validate({id: 1, username: 'username'});
        });
        it('should validate and display success message, when successful', function () {
            $httpBackend.expectPUT('/user/1/validate').respond(200);
            spyOn(successServiceMock, 'success');
            spyOn(userRepositoryMock, 'all');

            userResultController.validate({id: 1, username: 'username'});
            $httpBackend.flush();

            expect(successServiceMock.success).toHaveBeenCalled();
            expect(successServiceMock.success).toHaveBeenCalledWith('User username validated');
            expect(userRepositoryMock.all).toHaveBeenCalled();
        });
        it('should validated and display error message, when not successful', function () {
            $httpBackend.expectPUT('/user/1/validate').respond(500);
            spyOn(errorServiceMock, 'error');

            userResultController.validate({id: 1, username: 'username'});
            $httpBackend.flush();

            expect(errorServiceMock.error).toHaveBeenCalled();
            expect(errorServiceMock.error).toHaveBeenCalledWith('Validation failed');
        });
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});