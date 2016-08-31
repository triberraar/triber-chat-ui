'use strict';

angular.module('jwt', ['angular-jwt', 'localStorage'])
    .factory('JWT', function (jwtHelper, $localStorage) {
        var JWT = {
            isValid: function () {
                var jwtToken = $localStorage.get('jwt');
                return angular.isDefined(jwtToken) && !jwtHelper.isTokenExpired(jwtToken);
            },
            get: function () {
                return $localStorage.get('jwt');
            },
            decode: function () {
                if (JWT.isValid()) {
                    return jwtHelper.decodeToken(JWT.get());
                }
            },
            save: function (token) {
                $localStorage.set('jwt', token);
            },
            clear: function () {
                $localStorage.remove('jwt');
            }
        };
        return JWT;
    })
    .factory('JWTInterceptor', function (JWT) {
        function addToken(config) {
            var token = JWT.get();
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

        return {
            request: addToken
        };
    });