'use strict';

angular.module('connected-user.controller', ['errorService', 'connected-user.service', 'chat.private.service', 'securityService'])
    .controller('ConnectedUserController', function(ErrorService, ConnectedUserService, PrivateChatService, SecurityService) {
        var vm = this;

        vm.users = function() {
            return ConnectedUserService.getUsers();
        };

        vm.clickedUser = function(user) {
            if(user.username === SecurityService.getUsername()) {
                ErrorService.error('Can\'t chat with yourself');
            } else {
                PrivateChatService.chatWithUser(user);
            }
        };

        vm.getNumberOfUnreadMessagesForUser = function(user) {
            return PrivateChatService.getNumberOfUnreadMessagesForUser(user);
        };
    });