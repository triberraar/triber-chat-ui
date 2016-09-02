'use strict';

describe('connected-user.service', function() {

    var connectedUserService;

    var connectedUserRepositoryMock = {
        all: function() {},
        users: 'users'
    }, websocketMock = {
        subscribe: function() {},
        onConnected: function() {}
    };

    beforeEach(module('connected-user.service'));
    beforeEach(module(function ($provide) {
        $provide.value('Websocket', websocketMock);
        $provide.value('ConnectedUserRepository', connectedUserRepositoryMock);
    }));

    beforeEach(function () {
        spyOn(websocketMock, 'subscribe');
        spyOn(websocketMock, 'onConnected');
        spyOn(connectedUserRepositoryMock, 'all');
    });

    beforeEach(inject(function (_ConnectedUserService_) {
        connectedUserService = _ConnectedUserService_;
    }));

    describe('init',function() {
        it('should subscribe to /topic/user/connected', function() {
            connectedUserRepositoryMock.all.calls.reset();

            expect(websocketMock.subscribe).toHaveBeenCalled();
            expect(websocketMock.subscribe).toHaveBeenCalledWith('/topic/user/connected', jasmine.any(Function));

            websocketMock.subscribe.calls.argsFor(0)[1]();
            expect(connectedUserRepositoryMock.all).toHaveBeenCalled();
        });
        it('should subscribe to /topic/user/disconnected', function() {
            connectedUserRepositoryMock.all.calls.reset();

            expect(websocketMock.subscribe).toHaveBeenCalled();
            expect(websocketMock.subscribe).toHaveBeenCalledWith('/topic/user/disconnected', jasmine.any(Function));

            websocketMock.subscribe.calls.argsFor(1)[1]();
            expect(connectedUserRepositoryMock.all).toHaveBeenCalled();
        });
        it('should reload data on connection', function() {
            connectedUserRepositoryMock.all.calls.reset();

            expect(websocketMock.onConnected).toHaveBeenCalled();
            expect(websocketMock.onConnected).toHaveBeenCalledWith(jasmine.any(Function));

            websocketMock.onConnected.calls.mostRecent().args[0]();
            expect(connectedUserRepositoryMock.all).toHaveBeenCalled();
        });
        it('should load data', function() {
            expect(connectedUserRepositoryMock.all).toHaveBeenCalled();
        });
    });
    describe('getUsers', function() {
        it('should get the connected users', function() {
            expect(connectedUserService.getUsers()).toEqual('users');
        });
    });
});