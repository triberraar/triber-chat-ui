'use strict';

angular.module('chat.general.component', ['connected-user.component','chat.general.controller'])
    .component('generalChat', {
        templateUrl: '/js/triber-chat/chat/general/general.component.html',
        controller: 'GeneralChatController',
        controllerAs: 'generalChatCtrl'
    });