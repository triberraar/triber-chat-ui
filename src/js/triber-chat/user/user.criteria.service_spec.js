'use strict';

describe('user.criteria.service', function() {

    var userCriteriaService;

    beforeEach(module('user.criteria.service'));
    beforeEach(inject(function(_UserCriteriaService_) {
        userCriteriaService = _UserCriteriaService_;
    }));

    describe('init', function() {
        it('should set default values', function() {
            expect(userCriteriaService.username).toBeUndefined();
            expect(userCriteriaService.email).toBeUndefined();
            expect(userCriteriaService.activated).toBeUndefined();
            expect(userCriteriaService.validated).toBeUndefined();
            expect(userCriteriaService.currentPage).toEqual(1);
        });
    });
    describe('username', function() {
        it('should be assignable and readable', function() {
            userCriteriaService.username = 'username';

            expect(userCriteriaService.username).toEqual('username');
        });
    });
    describe('email', function() {
        it('should be assignable and readable', function() {
            userCriteriaService.email = 'email';

            expect(userCriteriaService.email).toEqual('email');
        });
    });
    describe('validated', function() {
        it('should be assignable and readable', function() {
            userCriteriaService.validated = true;

            expect(userCriteriaService.validated).toEqual(true);
        });
        it('should be undefined when passed empty string', function() {
            userCriteriaService.validated = '';

            expect(userCriteriaService.validated).toBeUndefined();
        });
    });
    describe('activated', function() {
        it('should be assignable and readable', function() {
            userCriteriaService.activated = true;

            expect(userCriteriaService.activated).toEqual(true);
        });
        it('should be undefined when passed empty string', function() {
            userCriteriaService.activated = '';

            expect(userCriteriaService.activated).toBeUndefined();
        });
    });
    describe('currentpage', function() {
        it('should be assignable and readable', function() {
            userCriteriaService.currentPage = 5;

            expect(userCriteriaService.currentPage).toEqual(5);
        });
    });
    describe('clear', function() {
        it('should set default values', function() {
            userCriteriaService.username = 'sdf';
            userCriteriaService.email = 'sdf';
            userCriteriaService.validated = 'sdf';
            userCriteriaService.activated = 'sdf';
            userCriteriaService.currentPage = 'sdf';

            userCriteriaService.clear();

            expect(userCriteriaService.username).toBeUndefined();
            expect(userCriteriaService.email).toBeUndefined();
            expect(userCriteriaService.activated).toBeUndefined();
            expect(userCriteriaService.validated).toBeUndefined();
            expect(userCriteriaService.currentPage).toEqual(1);
        });
    });
});