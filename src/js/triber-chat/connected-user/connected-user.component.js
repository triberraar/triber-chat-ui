'use strict';

angular.module('connected-user.component', ['connected-user.controller'])
    .component('connectedUser', {
        templateUrl: '/js/triber-chat/connected-user/connected-user.html',
        controller: 'ConnectedUserController',
        controllerAs: 'connectedUserCtrl'
    });