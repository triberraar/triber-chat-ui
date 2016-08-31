'use strict';

angular.module('user.criteria.service', [])
    .factory('UserCriteriaService', function () {
        var username, email, activated, validated, currentPage = 1;
        var userCriteriaService = {
            get username() {
                return username;
            },
            set username(value) {
                username = value;
            },
            get email() {
                return email;
            },
            set email(value) {
                email = value;
            },
            get activated() {
                return activated;
            },
            set activated(value) {
                activated = (value === '' ? undefined : value);
            },
            get validated() {
                return validated;
            },
            set validated(value) {
                validated = (value === '' ? undefined : value);
            },
            get currentPage() {
                return currentPage;
            },
            set currentPage(value) {
                currentPage = value;
            },
            clear: function () {
                username = undefined;
                email = undefined;
                validated = undefined;
                activated = undefined;
                currentPage = 1;
            }
        };

        return userCriteriaService;
    });