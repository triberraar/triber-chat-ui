'use strict';

describe('connected-user.repository', function () {

    var connectedUserRepository, $httpBackend;

    var errorServiceMock = {
        error: function() {}
    };

    beforeEach(module('connected-user.repository'));
    beforeEach(module(function ($provide) {
        $provide.value('ErrorService', errorServiceMock);
    }));

    beforeEach(inject(function (_$httpBackend_, _ConnectedUserRepository_) {
        connectedUserRepository = _ConnectedUserRepository_;
        $httpBackend = _$httpBackend_;
    }));

    describe('init', function () {
        it('should initialize users to empty', function () {
            expect(connectedUserRepository.users).toEqual({});
        });
    });

    describe('all', function () {
        it('should get the connected users from the backend', function () {
            $httpBackend.expectGET('/user/connected').respond(200, 'users');

            connectedUserRepository.all();
            $httpBackend.flush();

            expect(connectedUserRepository.users).toEqual('users');
        });
        it('should handle the error when communication fails', function () {
            spyOn(errorServiceMock, 'error');
            $httpBackend.expectGET('/user/connected').respond(500, 'error');

            connectedUserRepository.all();
            $httpBackend.flush();

            expect(errorServiceMock.error).toHaveBeenCalled();
            expect(errorServiceMock.error).toHaveBeenCalledWith('Couldn\'t load connected users.');
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});