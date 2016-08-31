'use strict';

angular.module('chat.private.component', ['chat.private.controller'])
    .component('privateChat', {
        templateUrl: '/js/triber-chat/chat/private/private.component.html',
        controller: 'PrivateChatController',
        controllerAs: 'privateChatCtrl'
    });