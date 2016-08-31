'use strict';

describe('jwt', function () {

    beforeEach(module('jwt'));

    describe('JWT', function () {

        var JWT;
        var jwtHelperMock = {
            isTokenExpired: function() {},
            decodeToken: function() {}
        }, localStorageMock = {
            get: function() {
            }, set: function() {},
            remove: function() {}
        };

        beforeEach(module(function ($provide) {
            $provide.value('jwtHelper', jwtHelperMock);
            $provide.value('$localStorage', localStorageMock);
        }));

        beforeEach(inject(function (_JWT_) {
            JWT = _JWT_;
        }));

        describe('isValid', function () {
            it('is false when no token in local storage', function () {
                spyOn(localStorageMock, 'get').and.returnValue(undefined);

                expect(JWT.isValid()).toEqual(false);
            });
            it('is false when token in local storage is expired', function () {
                spyOn(localStorageMock, 'get').and.returnValue('token');
                spyOn(jwtHelperMock, 'isTokenExpired').and.returnValue(true);


                expect(JWT.isValid()).toEqual(false);

            });
            it('is true otherwise', function () {
                spyOn(localStorageMock, 'get').and.returnValue('token');
                spyOn(jwtHelperMock, 'isTokenExpired').and.returnValue(false);


                expect(JWT.isValid()).toEqual(true);
            });
        });
        describe('get', function () {
            it('should return the token from local storage', function () {
                spyOn(localStorageMock, 'get').and.returnValue('token');

                expect(JWT.get()).toEqual('token');
            });
        });
        describe('decode', function () {
            it('should do nothing when token is invalid', function () {
                spyOn(localStorageMock, 'get').and.returnValue(undefined);

                expect(JWT.decode()).toBeUndefined();
            });
            it('should return decoded token when token is valid', function () {
                spyOn(localStorageMock, 'get').and.returnValue('token');
                spyOn(jwtHelperMock, 'isTokenExpired').and.returnValue(false);
                spyOn(jwtHelperMock, 'decodeToken').and.returnValue('decoded token');

                expect(JWT.decode()).toEqual('decoded token');
            });
        });
        describe('save', function () {
            it('should store the token in local storage', function () {
                spyOn(localStorageMock, 'set');

                JWT.save('token');

                expect(localStorageMock.set).toHaveBeenCalled();
                expect(localStorageMock.set).toHaveBeenCalledWith('jwt', 'token');
            });
        });
        describe('clear', function () {
            it('should clear the token from local storage', function () {
                spyOn(localStorageMock, 'remove');

                JWT.clear();

                expect(localStorageMock.remove).toHaveBeenCalled();
                expect(localStorageMock.remove).toHaveBeenCalledWith('jwt');
            });
        });
    });

    describe('JWTInterceptor', function () {
        var JWTInterceptor;

        var JWTMock = {
            get: function() {}
        };

        beforeEach(module(function ($provide) {
            $provide.value('JWT', JWTMock);
        }));

        beforeEach(inject(function (_JWTInterceptor_) {
            JWTInterceptor = _JWTInterceptor_;
        }));

        it('should do nothing when no jwt token', function () {
            spyOn(JWTMock, 'get').and.returnValue(undefined);
            var config = {};

            JWTInterceptor.request(config);

            expect(config).toEqual({});
        });
        it('should add the jwt token as a header when a token exists', function () {
            spyOn(JWTMock, 'get').and.returnValue('token');
            var config = {};

            JWTInterceptor.request(config);

            expect(config.headers.Authorization).toEqual('Bearer token');
        });
    });
});