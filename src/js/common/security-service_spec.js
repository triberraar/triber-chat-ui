'use strict';

describe('security-service', function () {

    beforeEach(module('securityService'));

    describe('SecurityService', function () {
        var securityService;
        var JWTMock = {
            decode: function () {
            }
        };
        beforeEach(module(function ($provide) {
            $provide.value('JWT', JWTMock);
        }));
        beforeEach(inject(function (SecurityService) {
            securityService = SecurityService;
        }));

        describe('getRoles', function () {

            it('returns roles from jwt token', function () {
                spyOn(JWTMock, 'decode').and.returnValue({roles: ['1', '2']});

                expect(securityService.getRoles()).toEqual(['1', '2']);
            });
            it('returns emtpy when no valid jwt token', function () {
                spyOn(JWTMock, 'decode').and.returnValue(undefined);

                expect(securityService.getRoles()).toEqual([]);
            });
        });
        describe('hasRole', function () {
            it('return true when token has given role', function () {
                spyOn(JWTMock, 'decode').and.returnValue({roles: ['1', '2']});

                expect(securityService.hasRole('1')).toEqual(true);
            });
            it('returns false when token doesn\'t have given role', function () {
                spyOn(JWTMock, 'decode').and.returnValue({roles: ['1', '2']});

                expect(securityService.hasRole('3')).toEqual(false);
            });
        });
        describe('getUsername', function () {
            it('returns the username when token contains username', function () {
                spyOn(JWTMock, 'decode').and.returnValue({username: 'username'});

                expect(securityService.getUsername()).toEqual('username');
            });
            it('returns undefined when token doesn\'t contain a username', function() {
                spyOn(JWTMock, 'decode').and.returnValue({});

                expect(securityService.getUsername()).toBeUndefined();
            });
        });
    });
    describe('SecurityController', function () {
        var controller;
        var securityServiceMock = {
            hasRole: function () {
            }
        };

        beforeEach(inject(function (_$controller_) {
            controller = _$controller_('SecurityController', {
                SecurityService: securityServiceMock
            });
        }));

        describe('allowed', function () {
            it('returns true when user has given role', function () {
                spyOn(securityServiceMock, 'hasRole').and.returnValue(true);
                controller.permission = 'permission';

                expect(controller.allowed()).toEqual(true);
            });
            it('return false when user doesn\'t have given role', function () {
                spyOn(securityServiceMock, 'hasRole').and.returnValue(false);
                controller.permission = 'permission';

                expect(controller.allowed()).toEqual(false);
            });
        });
    });
});