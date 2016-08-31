'use strict';

angular.module('user.criteria.controller', ['user.repository', 'user.criteria.service'])
    .controller('UserCriteriaController', function ( UserRepository, UserCriteriaService) {
        var vm = this;

        var init = function () {
            vm.currentPage = UserCriteriaService.currentPage;

            vm.loadData();
        };

        vm.username = function(value) {
            return arguments.length ? (UserCriteriaService.username = value) : UserCriteriaService.username;
        };

        vm.email = function(value) {
            return arguments.length ? (UserCriteriaService.email = value) : UserCriteriaService.email;
        };

        vm.validated = function(value) {
            return arguments.length ? (UserCriteriaService.validated = value) : UserCriteriaService.validated;
        };

        vm.activated = function(value) {
            return arguments.length ? (UserCriteriaService.activated = value) : UserCriteriaService.activated;
        };

        vm.loadData = function () {
            UserCriteriaService.currentPage = vm.currentPage;
            UserRepository.all();
        };

        vm.clear = function() {
            UserCriteriaService.clear();
        };

        init();

    });