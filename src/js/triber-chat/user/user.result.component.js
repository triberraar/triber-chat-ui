'use strict';

angular.module('user.result.component', ['user.result.controller'])
    .component('userResult', {
        controller: 'UserResultController',
        controllerAs: 'userResultCtrl',
        templateUrl: '/js/triber-chat/user/user.result.component.html'
    });