'use strict';

describe('menu', function() {

    var menuController;

    var notificationServiceMock = {
        numberOfNotifications: function() { return 'number of notifications'; },
        notifications: function() { return 'notifications'; }
    }, websocketMock = {
        connected: function() { return 'connected'; }
    }, JWTMock = {
        clear: function() { }
    }, $windowMock = {
        location: {}
    }, $stateMock = {
        go: function() {}
    };

    beforeEach(module('menu'));

    beforeEach(inject(function(_$controller_) {

        menuController = _$controller_('MenuController', {
            NotificationService: notificationServiceMock,
            Websocket: websocketMock,
            JWT: JWTMock,
            $window: $windowMock,
            $state: $stateMock
        });
    }));

    describe('numberOfNotifications', function() {
        it('should return the number of notifications', function() {
            expect(menuController.numberOfNotifications()).toEqual('number of notifications');
        });
    });

    describe('notifications', function() {
        it('should return the notifications', function() {
            expect(menuController.notifications()).toEqual('notifications');
        });
    });
    describe('goToNotification', function() {
        it('should navigate to the notification if it has a link', function() {
            spyOn($stateMock, 'go');

            menuController.goToNotification({link: 'link'});

            expect($stateMock.go).toHaveBeenCalled();
            expect($stateMock.go).toHaveBeenCalledWith('link');
        });
        it('should do nothing when the notification has no link', function() {
            spyOn($stateMock, 'go');

            menuController.goToNotification({});

            expect($stateMock.go).not.toHaveBeenCalled();
        });
    });
    describe('connected', function() {
        it('should return if connected', function() {
            expect(menuController.connected()).toEqual('connected');
        });
    });
    describe('logout', function() {
        it('should clear the jwt token and navigate to the login page', function() {
            spyOn(JWTMock, 'clear');

            menuController.logout();

            expect(JWTMock.clear).toHaveBeenCalled();
            expect($windowMock.location.href).toEqual('/');
        });
    });
});