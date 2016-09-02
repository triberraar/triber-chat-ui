'use strict';

describe('notificationService', function() {

    var notificationService, $httpBackend;

    var securityServiceMock = {
        hasRole: function() {},
        isAdmin: function() {return true; }
    }, websocketMock = {
        subscribe:function() {},
        onConnected: function() {}
    };

    beforeEach(module('notificationService'));

    beforeEach(module(function ($provide) {
        $provide.value('SecurityService', securityServiceMock);
        $provide.value('Websocket', websocketMock);
    }));

    describe('init', function() {
        it('should subscribe to registeredUser when admin', function() {
            spyOn(securityServiceMock, 'hasRole').and.returnValue(true);
            spyOn(websocketMock, 'subscribe');

            inject(function(_NotificationService_, _$httpBackend_) {
                notificationService = _NotificationService_;
                $httpBackend = _$httpBackend_;
            });

            expect(securityServiceMock.hasRole).toHaveBeenCalled();
            expect(securityServiceMock.hasRole).toHaveBeenCalledWith('ROLE_ADMIN');
            expect(websocketMock.subscribe).toHaveBeenCalledTimes(2);
            expect(websocketMock.subscribe).toHaveBeenCalledWith('/topic/notifications/registeredUser', jasmine.any(Function));
            websocketMock.subscribe.calls.argsFor(0)[1]();
            $httpBackend.expectGET('/user/unvalidated').respond(200);
            $httpBackend.flush();
        });
        it('should subscribe to validatedUser when admin', function() {
            spyOn(securityServiceMock, 'hasRole').and.returnValue(true);
            spyOn(websocketMock, 'subscribe');

            inject(function(_NotificationService_, _$httpBackend_) {
                notificationService = _NotificationService_;
                $httpBackend = _$httpBackend_;
            });

            expect(securityServiceMock.hasRole).toHaveBeenCalled();
            expect(securityServiceMock.hasRole).toHaveBeenCalledWith('ROLE_ADMIN');
            expect(websocketMock.subscribe).toHaveBeenCalledTimes(2);
            expect(websocketMock.subscribe).toHaveBeenCalledWith('/topic/notifications/validatedUser', jasmine.any(Function));
            websocketMock.subscribe.calls.argsFor(1)[1]();
            $httpBackend.expectGET('/user/unvalidated').respond(200);
            $httpBackend.flush();
        });
        it('should register a callback to onConnected', function() {
            spyOn(securityServiceMock, 'hasRole').and.returnValue(true);
            spyOn(websocketMock, 'onConnected');

            inject(function(_NotificationService_, _$httpBackend_) {
                notificationService = _NotificationService_;
                $httpBackend = _$httpBackend_;
            });

            expect(securityServiceMock.hasRole).toHaveBeenCalled();
            expect(securityServiceMock.hasRole).toHaveBeenCalledWith('ROLE_ADMIN');
            expect(websocketMock.onConnected).toHaveBeenCalledWith(jasmine.any(Function));
            websocketMock.onConnected.calls.argsFor(0)[0]();
            $httpBackend.expectGET('/user/unvalidated').respond(200);
            $httpBackend.flush();
        });
        it('shouldn\'t subscribe when not admin', function() {
            spyOn(securityServiceMock, 'hasRole').and.returnValue(false);
            spyOn(websocketMock, 'subscribe');

            inject(function(_NotificationService_) {
                notificationService = _NotificationService_;
            });

            expect(securityServiceMock.hasRole).toHaveBeenCalled();
            expect(securityServiceMock.hasRole).toHaveBeenCalledWith('ROLE_ADMIN');
            expect(websocketMock.subscribe).not.toHaveBeenCalled();
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
    describe('addNotification', function() {
        beforeEach(inject(function(_NotificationService_) {
            notificationService = _NotificationService_;
        }));
        it('should add the notification and increase number of notification if notification does\'t exist already', function() {
            notificationService.addNotification({ key:'key', message:'value'});

            expect(notificationService.notification('key')).toEqual({ key:'key', message:'value'});
            expect(notificationService.numberOfNotifications()).toEqual(1);
        });
        it('should do nothing if notification already exists', function() {
            notificationService.addNotification({ key:'key', message:'value'});
            notificationService.addNotification({ key:'key', message:'value'});

            expect(notificationService.notification('key')).toEqual({ key:'key', message:'value'});
            expect(notificationService.numberOfNotifications()).toEqual(1);
        });
    });
    describe('removeNotification', function() {
        beforeEach(inject(function(_NotificationService_) {
            notificationService = _NotificationService_;
        }));
        it('should remove the notification and decrease number of notifications if notification exists', function() {
            notificationService.addNotification({ key:'key', message:'value'});
            notificationService.removeNotification('key');

            expect(notificationService.notification('key')).toBeUndefined();
            expect(notificationService.numberOfNotifications()).toEqual(0);
        });
        it('should do nothing if notification doesn\'t exist', function() {
            notificationService.removeNotification('key');

            expect(notificationService.notification('key')).toBeUndefined();
            expect(notificationService.numberOfNotifications()).toEqual(0);
        });
    });
    describe('checkUnvalidatedUsers', function() {
        beforeEach(inject(function(_NotificationService_, _$httpBackend_) {
            notificationService = _NotificationService_;
            $httpBackend = _$httpBackend_;
        }));
        it('should add notification if unvalidated user exists', function() {
            $httpBackend.expectGET('/user/unvalidated').respond(200);

            notificationService.checkUnvalidatedUsers();

            $httpBackend.flush();

            expect(notificationService.notification('unvalidatedUser')).toEqual({ key: 'unvalidatedUser',  message: 'There are unvalidated users.', cssClass: 'fa fa-user fa-fw', admin: true, link: 'user'});
        });
        it('should remove notification if no unvalidated user exists', function() {
            $httpBackend.expectGET('/user/unvalidated').respond(404);

            notificationService.checkUnvalidatedUsers();

            $httpBackend.flush();

            expect(notificationService.notification('unvalidatedUser')).toBeUndefined();
        });
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
    describe('notifications', function() {
        it('should return the notifications', function() {
            notificationService.addNotification({ key:'key', message:'value'});
            notificationService.addNotification({ key:'key2', message:'value2'});

            expect(notificationService.notifications()).toEqual({key: { key:'key', message:'value'}, key2:{ key:'key2', message:'value2'}});
        });
    });
    describe('notification', function() {
        beforeEach(inject(function(_NotificationService_) {
            notificationService = _NotificationService_;
        }));
        it('should return the notification with key', function() {
            notificationService.addNotification({ key:'key', message:'value'});

            expect(notificationService.notification('key')).toEqual({ key:'key', message:'value'});
        });
    });
    describe('numberOfNotifications', function() {
        beforeEach(inject(function(_NotificationService_) {
            notificationService = _NotificationService_;
        }));
        it('should return the number of notifications', function() {
            expect(notificationService.numberOfNotifications()).toEqual(0);
            notificationService.addNotification({ key:'key', message:'value'});

            expect(notificationService.numberOfNotifications()).toEqual(1);
            notificationService.addNotification({ key:'key2', message:'value'});
            expect(notificationService.numberOfNotifications()).toEqual(2);
        });
    });
});