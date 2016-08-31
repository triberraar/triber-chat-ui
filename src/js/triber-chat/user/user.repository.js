'use strict';

function UserRepository($http, ErrorService, UserCriteriaService) {
    var UserRepository = {};
    UserRepository.users = {};
    UserRepository.totalElements;
    UserRepository.itemsPerPage;
    UserRepository.all = function () {
        var queryParams = {
            page: UserCriteriaService.currentPage - 1,
            validated: UserCriteriaService.validated,
            activated: UserCriteriaService.activated,
            username: UserCriteriaService.username,
            email: UserCriteriaService.email
        };

        return $http.get('/user', {params: queryParams}).
        then( function (response) {
            UserRepository.users = response.data.content;
            UserRepository.totalElements = response.data.totalElements;
            UserRepository.itemsPerPage = response.data.size;
        }, function () {
            ErrorService.error('Could not get users');
        });
    };
    return UserRepository;
}

angular.module('user.repository', [ 'ng', 'errorService', 'user.criteria.service'])
    .factory('UserRepository', UserRepository);