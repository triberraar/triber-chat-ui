'use strict';

angular.module('user.result.controller', ['user.resource', 'errorService', 'successService', 'user.repository'])
    .controller('UserResultController', function (UserResource, ErrorService, SuccessService, UserRepository) {
        var vm = this;

        vm.init = function () {
            vm.validating = false;
        };

        vm.users = function() {
            return UserRepository.users;
        };

        vm.validate = function (user) {
            if (vm.validating) {
                return;
            }
            vm.validating = true;
            UserResource.validate({userId: user.id}).$promise.then(function () {
                vm.validating = false;
                SuccessService.success('User ' + user.username + ' validated');
                UserRepository.all();
            }, function () {
                vm.validating = false;
                ErrorService.error('Validation failed');
            });
        };

        vm.init();


    });