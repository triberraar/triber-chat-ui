'use strict';

describe('local-storage', function() {
    var localStorage;

    var windowMock = {
        localStorage : {}
    };

    beforeEach(module('localStorage'));

    beforeEach(module(function ($provide) {
        $provide.value('$window', windowMock);
    }));

    beforeEach(inject(function($localStorage) {
        localStorage = $localStorage;
    }));

    beforeEach(function() {
        windowMock.localStorage = {};
    });

    describe('set', function() {
        it('should save to local storage', function() {
            localStorage.set('key', 'value');

            expect(windowMock.localStorage.key).toEqual('value');
        });
    });
    describe('get', function() {
        it('should return from local storage', function() {
            windowMock.localStorage.key = 'value';

            expect(localStorage.get('key')).toEqual('value');
        });
    });
    describe('setObject', function() {
        it('should save content as json string in local storage', function() {
            localStorage.setObject('key',{id: 1});

            expect(windowMock.localStorage.key).toEqual('{"id":1}');
        });
    });
    describe('getObject', function() {
        it('should read the json string from local storage to object', function() {
            windowMock.localStorage.key='{"id": 2}';

            expect(localStorage.getObject('key')).toEqual({id: 2});
        });
    });
    describe('remove', function() {
        it('should remove from localstorage', function() {
            windowMock.localStorage = {
                removeItem: function() {}
            };
            spyOn(windowMock.localStorage, 'removeItem');

            localStorage.remove('key');

            expect(windowMock.localStorage.removeItem).toHaveBeenCalled();
        });
    });
});