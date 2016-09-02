'use strict';

angular.module('chat.general.controller', ['chat.general.service', 'websocket'])
    .controller('GeneralChatController', function(Websocket, GeneralChatService) {
        var vm = this;

        vm.connected = function() {
            return Websocket.connected();
        };

        vm.say = function() {
            if( angular.isDefined( vm.content) && vm.content.trim() != '' && vm.messageForm.$valid) {
                GeneralChatService.sendMessage({content: vm.content});
                vm.content=undefined;
            }
        };

        vm.messages = function() {
            return GeneralChatService.getMessages();
        };

    });