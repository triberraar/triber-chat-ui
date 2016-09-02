'use strict';

function ConnectedUserRepository($http, ErrorService) {
    var connectedUserRepository = {};

    connectedUserRepository.users = {};
    connectedUserRepository.all = function() {
        return $http.get('/user/connected').then(function(response) {
            connectedUserRepository.users = response.data;
        }, function() {
            ErrorService.error('Couldn\'t load connected users.');
        });
    };

    return connectedUserRepository;
}

angular.module('connected-user.repository', ['ng', 'errorService'])
    .factory('ConnectedUserRepository', ConnectedUserRepository);
