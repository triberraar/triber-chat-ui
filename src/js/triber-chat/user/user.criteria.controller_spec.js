'use strict';
describe('user.criteria.controller', function() {
    var $controller, rootScope, scope;

    var userCriteriaServiceMock = {
        currentPage: 3,
        username: 'username',
        email: 'email',
        validated: 'validated',
        activated: 'activated',
        clear: function(){}
    }, userRepositoryMock = {
        all: function() {}
    };

    beforeEach(module('user.criteria.controller'));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
        rootScope = _$rootScope_;
        $controller = _$controller_;
    }));

    var createController = function() {
        scope = rootScope.$new();
        return $controller('UserCriteriaController', {
            $rootScope: rootScope,
            $scope: scope,
            UserCriteriaService: userCriteriaServiceMock,
            UserRepository: userRepositoryMock
        });
    };

    describe('init', function() {
        var controller;
        beforeEach(function() {
            spyOn(userRepositoryMock, 'all');
            controller = createController();
        });

        it('should get the current page from usercriteria service', function() {
            expect(controller.currentPage).toEqual(3);
        });

        it('should get the data', function() {
            expect(userRepositoryMock.all).toHaveBeenCalled();
        });

    });
    describe('username', function() {
        var controller;
        beforeEach(function() {
            controller = createController();
        });
        it('should work as getter', function() {
            expect(controller.username()).toEqual('username');
        });
        it('should work as setter', function() {
            controller.username('new username');

            expect(userCriteriaServiceMock.username).toEqual('new username');
        });
    });
    describe('email', function() {
        var controller;
        beforeEach(function() {
            controller = createController();
        });
        it('should work as getter', function() {
            expect(controller.email()).toEqual('email');
        });
        it('should work as setter', function() {
            controller.email('new email');

            expect(userCriteriaServiceMock.email).toEqual('new email');
        });
    });
    describe('validated', function() {
        var controller;
        beforeEach(function() {
            controller = createController();
        });
        it('should work as getter', function() {
            expect(controller.validated()).toEqual('validated');
        });
        it('should work as setter', function() {
            controller.validated('new validated');

            expect(userCriteriaServiceMock.validated).toEqual('new validated');
        });
    });
    describe('activated', function() {
        var controller;
        beforeEach(function() {
            controller = createController();
        });
        it('should work as getter', function() {
            expect(controller.activated()).toEqual('activated');
        });
        it('should work as setter', function() {
            controller.activated('new activated');

            expect(userCriteriaServiceMock.activated).toEqual('new activated');
        });
    });
    describe('loadData', function() {
        var controller;
        beforeEach(function() {
            controller = createController();
            spyOn(userRepositoryMock, 'all');
            controller.currentPage = 15;
        });
        it('should load the data', function() {
            controller.loadData();

            expect(userRepositoryMock.all).toHaveBeenCalled();
            expect(userCriteriaServiceMock.currentPage).toEqual(15);
        });
    });
    describe('clear', function() {
        var controller;
        beforeEach(function() {
            controller = createController();
            spyOn(userCriteriaServiceMock, 'clear');
        });
        it('should clear the search criteria', function() {
            controller.clear();

            expect(userCriteriaServiceMock.clear).toHaveBeenCalled();
        });
    });

});