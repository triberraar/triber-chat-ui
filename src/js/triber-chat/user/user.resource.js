'use strict';

angular.module('user.resource', ['ngResource'])
    .factory('UserResource', function ($resource) {
        return $resource('/user/:userId/:action', {}, {
            validate: {
                method: 'PUT',
                params: {action: 'validate', userId: '@userId'}
            }
        });
    });
