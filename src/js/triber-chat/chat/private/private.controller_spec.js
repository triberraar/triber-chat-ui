'use strict';

describe('chat.private.controller', function () {

    var $controller, controller;

    var privateChatServiceMock = {
            show: true,
            hide: function () {
                return 'hide';
            },
            selectedUser: {
                username: 'selected user'
            },
            getMessagesFromSelectedUser: function () {
                return 'messages';
            }
        },
        websocketMock = {
            send: function () {
            }
        },
        securityServiceMock = {
            getUsername: function () {
                return 'username';
            }
        };

    beforeEach(module('chat.private.controller'));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    var createController = function () {
        controller = $controller('PrivateChatController', {
            Websocket: websocketMock,
            PrivateChatService: privateChatServiceMock,
            SecurityService: securityServiceMock
        });
    };

    beforeEach(createController);

    describe('shouldShow', function () {
        it('should return if private messages be shown', function () {
            expect(controller.shouldShow()).toEqual(true);
        });
    });

    describe('hide', function () {
        it('should hide the private messages', function () {
            expect(controller.hide()).toEqual('hide');
        });
    });

    describe('user', function () {
        it('should return the selected user', function () {
            expect(controller.user()).toEqual({username: 'selected user'});
        });
    });

    describe('chat', function () {
        it('should send the message when valid', function () {
            controller.message = 'message';
            spyOn(websocketMock, 'send');

            controller.chat();

            expect(websocketMock.send).toHaveBeenCalled();
            expect(websocketMock.send).toHaveBeenCalledWith('/app/message/private', {
                content: 'message',
                to: 'selected user',
                from: 'username'
            });
            expect(controller.message).toEqual('');
        });
        it('should not send the message when message undefined', function () {
            controller.message = undefined;
            spyOn(websocketMock, 'send');

            controller.chat();

            expect(websocketMock.send).not.toHaveBeenCalled();
        });
        it('should not send the message when message is only spaces', function () {
            controller.message = '   ';
            spyOn(websocketMock, 'send');

            controller.chat();

            expect(websocketMock.send).not.toHaveBeenCalled();
        });
    });

    describe('messages', function () {
        it('should return the messages', function () {
            expect(controller.messages()).toEqual('messages');
        });
    });
});