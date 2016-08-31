'use strict';

describe('user.repository', function () {

    var userRepository, $httpBackend;

    var errorServiceMock = {
        error: function() {}
    }, userCriteriaServiceMock = {
        currentPage: 1,
        username: 'username',
        email: 'email',
        validated: true,
        activated: true
    };

    beforeEach(module('user.repository'));
    beforeEach(module(function ($provide) {
        $provide.value('ErrorService', errorServiceMock);
        $provide.value('UserCriteriaService', userCriteriaServiceMock);
    }));

    beforeEach(inject(function (_$httpBackend_, _UserRepository_) {
        userRepository = _UserRepository_;
        $httpBackend = _$httpBackend_;
    }));


    describe('init', function () {
        it('should set default values', function () {
            expect(userRepository.users).toEqual({});
            expect(userRepository.totalElements).toBeUndefined();
            expect(userRepository.itemsPerPage).toBeUndefined();
        });
    });
    describe('all', function () {
        it('should get all users with passed queryparams', function () {
            var returnValue = {
                content: [
                    {id: 1}
                ],
                totalElements: 4,
                size: 10
            };
            $httpBackend.expectGET('/user?activated=true&email=email&page=0&username=username&validated=true').respond(200, returnValue);

            userRepository.all();
            $httpBackend.flush();

            expect(userRepository.users).toEqual([{id: 1}]);
            expect(userRepository.totalElements).toEqual(4);
            expect(userRepository.itemsPerPage).toEqual(10);
        });
        it('should handle error when call fails', function () {
            spyOn(errorServiceMock, 'error');
            $httpBackend.expectGET('/user?activated=true&email=email&page=0&username=username&validated=true').respond(500, {error: 'error'});

            userRepository.all();
            $httpBackend.flush();

            expect(errorServiceMock.error).toHaveBeenCalled();
            expect(errorServiceMock.error).toHaveBeenCalledWith('Could not get users');
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});