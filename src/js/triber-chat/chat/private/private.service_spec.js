'use strict';

describe('chat.private.service', function () {

    var privateChatService;

    var websocketMock = {
        subscribe: function () {
        },
        send: function () {
        }
    }, messageConfigMock = {
        numberOfMessages: 1
    }, securityServiceMock = {
        getUsername: function() {
            return 'username';
        }
    }, notificationServiceMock = {
        addNotification: function() {},
        removeNotification: function() {}
    };

    beforeEach(module('chat.private.service'));

    beforeEach(module(function ($provide) {
        $provide.value('Websocket', websocketMock);
        $provide.value('MessageConfig', messageConfigMock);
        $provide.value('SecurityService', securityServiceMock);
        $provide.value('NotificationService', notificationServiceMock);
    }));

    beforeEach(function () {
        spyOn(websocketMock, 'subscribe');
    });

    beforeEach(inject(function (_PrivateChatService_) {
        privateChatService = _PrivateChatService_;
    }));

    describe('init', function () {
        it('should subscribe to /user/topic/message/private and set default values', function () {
            expect(websocketMock.subscribe).toHaveBeenCalled();
            expect(websocketMock.subscribe).toHaveBeenCalledWith('/user/topic/message/private', jasmine.any(Function));
            expect(privateChatService.show).toEqual(false);
            expect(privateChatService.selectedUser).toEqual(undefined);
            expect(privateChatService._messages).toEqual({});
        });
    });
    describe('on private message', function () {
        describe('user is sender', function () {
            it('should add the message', function () {
                websocketMock.subscribe.calls.mostRecent().args[1]({from: 'username', to: 'to', content: 'message1'});

                expect(privateChatService._messages).toEqual({ to: { messages: [{from: 'username', to: 'to', own: true, content: 'message1'}], unread: 0}});

                websocketMock.subscribe.calls.mostRecent().args[1]({from: 'username', to: 'to', content: 'message2'});

                expect(privateChatService._messages).toEqual({ to: { messages: [{from: 'username', to: 'to', own: true, content: 'message2'}], unread: 0}});
            });
        });
        describe('user is receiver', function () {
            it('should add the message', function () {
                websocketMock.subscribe.calls.mostRecent().args[1]({from: 'from', to: 'username', content: 'message1'});

                expect(privateChatService._messages).toEqual({ from: { messages: [{from: 'from', to: 'username', own: false, content: 'message1'}], unread: 1}});

                websocketMock.subscribe.calls.mostRecent().args[1]({from: 'from', to: 'username', content: 'message2'});

                expect(privateChatService._messages).toEqual({ from: { messages: [{from: 'from', to: 'username', own: false, content: 'message2'}], unread: 2}});
            });
            it('should increase number of unread messages if no user is selected', function () {
                messageConfigMock.numberOfMessages = 2;
                websocketMock.subscribe.calls.mostRecent().args[1]({from: 'from', to: 'username', content: 'message1'});
                websocketMock.subscribe.calls.mostRecent().args[1]({from: 'from', to: 'username', content: 'message2'});

                expect(privateChatService._messages).toEqual({ from: { messages: [{from: 'from', to: 'username', own: false, content: 'message1'}, {from: 'from', to: 'username', content: 'message2', own: false}], unread: 2}});
            });
            it('should increase number of unread messages if the sender is not the selected user', function () {
                privateChatService.chatWithUser({username: 'other'});

                websocketMock.subscribe.calls.mostRecent().args[1]({from: 'from', to: 'username', content: 'message1'});

                expect(privateChatService._messages).toEqual({ from: { messages: [{from: 'from', to: 'username', own: false, content: 'message1'}], unread: 1}});
            });
            it('should add a notification if unread message exists', function () {
                spyOn(notificationServiceMock, 'addNotification');

                websocketMock.subscribe.calls.mostRecent().args[1]({from: 'from', to: 'username', content: 'message1'});

                expect(notificationServiceMock.addNotification).toHaveBeenCalled();
                expect(notificationServiceMock.addNotification).toHaveBeenCalledWith({ key: 'privateMessage', message: 'You received private messages.', cssClass: 'fa fa-comment fa-fw', admin: false});
            });
        });
    });
    describe('chatWithUser', function () {
        it('should set the user as selected user and the number of unread messages for user to 0', function () {
            websocketMock.subscribe.calls.mostRecent().args[1]({from: 'from', to: 'username', content: 'message1'});

            privateChatService.chatWithUser({username: 'from'});

            expect(privateChatService.selectedUser).toEqual({username: 'from'});
            expect(privateChatService.show).toEqual(true);
            expect(privateChatService._messages).toEqual({ from: { messages: [{from: 'from', to: 'username', own: false, content: 'message1'}], unread: 0}});
        });
        it('should remove the notification if no unread messages exists any longer (eg only for this user there were unread messages)', function () {
            spyOn(notificationServiceMock, 'removeNotification');

            privateChatService.chatWithUser({username: 'from'});

            expect(notificationServiceMock.removeNotification).toHaveBeenCalled();
            expect(notificationServiceMock.removeNotification).toHaveBeenCalledWith('privateMessage');
        });
    });
    describe('hide', function () {
        it('should hide the private chat component', function () {
            privateChatService.chatWithUser({username: 'from'});

            privateChatService.hide();

            expect(privateChatService.selectedUser).toBeUndefined();
            expect(privateChatService.show).toEqual(false);
        });
    });
    describe('getMessagesFromSelectedUser', function () {
        it('should return the messages for the selected user', function () {
            privateChatService.chatWithUser({username: 'from'});
            websocketMock.subscribe.calls.mostRecent().args[1]({from: 'from', to: 'username', content: 'message1'});

            expect(privateChatService.getMessagesFromSelectedUser()).toEqual([{ from: 'from', to: 'username', content: 'message1', own: false }]);
        });
    });
    describe('getNumberOfUnreadMessagesForUser', function () {
        it('should return the number of unread messages for the user', function () {
            websocketMock.subscribe.calls.mostRecent().args[1]({from: 'from', to: 'username', content: 'message1'});

            expect(privateChatService.getNumberOfUnreadMessagesForUser({username: 'from'})).toEqual(1);
        });
        it('should return 0 if there are no messages for the user', function () {
            expect(privateChatService.getNumberOfUnreadMessagesForUser({username: 'other'})).toEqual(0);
        });
    });
});