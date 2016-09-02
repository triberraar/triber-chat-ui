'use strict';

var dependencies = [
    'ui.router',
    'ngMessages',
    'ngResource',
    'toaster',
    'ngAnimate',
    'ngPasswordStrength',
    'vcRecaptcha',
    'angular-ladda',
    'activateRegistration',
    'login',
    'register',
    'resetPassword'];

angular.module('triber-chat-login', dependencies)
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'js/triber-chat-login/login/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl',
            onExit: function (toaster) {
                toaster.clear(undefined, 'loginFailedToastId');
            }
        }).state('register', {
            url: '/register',
            templateUrl: 'js/triber-chat-login/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'registerCtrl',
        }).state('activate-registration', {
            url: '/activate-registration/:userId',
            templateUrl: 'js/triber-chat-login/activate-registration/activate-registration.html',
            controller: 'ActivateRegistrationController',
            controllerAs: 'activateRegistrationCtrl',
        }).state('reset-password', {
            url: '/reset-password',
            templateUrl: 'js/triber-chat-login/reset-password/reset-password.html',
            controller: 'ResetPasswordController',
            controllerAs: 'resetPasswordCtrl',
        }).state('confirm-reset-password', {
            url: '/reset-password/:resetPasswordId',
            templateUrl: 'js/triber-chat-login/reset-password/confirm-reset-password.html',
            controller: 'ConfirmResetPasswordController',
            controllerAs: 'confirmResetPasswordCtrl',
        });

    });
