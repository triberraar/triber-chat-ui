'use strict';

angular.module('chat.general.service', ['_', 'websocket'])
    .factory('GeneralChatService', function( _, Websocket, MessageConfig) {
        var messages = [];

        Websocket.subscribe('/topic/message/general', function(message) {
            messages.push(message);
            messages = _.takeRight(messages, MessageConfig.numberOfMessages);
        });

        var generalChatService = {
            getMessages: function() {
                return messages;
            },
            sendMessage: function(message) {
                Websocket.send('/app/message/general', message);
            }
        };

        return generalChatService;

    });