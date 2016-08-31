'use strict';

describe('chat.general.service', function() {

    var generalChatService;

    var websocketMock = {
        subscribe: function() {},
        send: function() {}
    }, messageConfigMock = {
        numberOfMessages: 1
    };

    beforeEach(module('chat.general.service'));

    beforeEach(module(function ($provide) {
        $provide.value('Websocket', websocketMock);
        $provide.value('MessageConfig', messageConfigMock);
    }));

    beforeEach(function() {
        spyOn(websocketMock, 'subscribe');
    });

    beforeEach(inject(function(_GeneralChatService_) {
        generalChatService = _GeneralChatService_;
    }));

    describe('init', function() {
        it('should initialize with an empty messages array', function() {
            expect(generalChatService.getMessages()).toEqual([]);
        });
        it('should subscribe to /topic/message/general and append received messages', function() {
            expect(websocketMock.subscribe).toHaveBeenCalled();
            expect(websocketMock.subscribe).toHaveBeenCalledWith('/topic/message/general', jasmine.any(Function));

        });
    });

    describe('on message', function() {
        it('it should append the message and delete older message when threshold is crossed', function() {
            websocketMock.subscribe.calls.mostRecent().args[1]('message1');
            expect(generalChatService.getMessages()).toEqual(['message1']);
            websocketMock.subscribe.calls.mostRecent().args[1]('message2');
            expect(generalChatService.getMessages()).toEqual(['message2']);
        });
    });

    describe('getMessages', function() {
        it('should return all messages', function() {
            websocketMock.subscribe.calls.mostRecent().args[1]('message1');

            expect(generalChatService.getMessages()).toEqual(['message1']);
        });
    });

    describe('sendMessage', function() {
        it('should send the message', function() {
            spyOn(websocketMock, 'send');

            generalChatService.sendMessage('message');

            expect(websocketMock.send).toHaveBeenCalled();
            expect(websocketMock.send).toHaveBeenCalledWith('/app/message/general', 'message');
        });
    });
});