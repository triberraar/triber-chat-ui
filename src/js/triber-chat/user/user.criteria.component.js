'use strict';

angular.module('user.criteria.component', ['user.criteria.controller'])
    .component('userCriteria', {
        controller: 'UserCriteriaController',
        controllerAs: 'userCriteriaCtrl',
        templateUrl: '/js/triber-chat/user/user.criteria.component.html'
    });