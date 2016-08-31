'use strict';

angular.module('login', [ 'ngResource', 'ng', 'jwt', 'warningService', 'errorService' ])
.factory('LoginResource', function($resource) {
	return $resource('/login', {}, {
		login : {
			method : 'POST',
			transformResponse : function(data, headers) {
				var response = {};
				response.data = data;
				response.headers = headers();
				return response;
			}
		}
	});
}).controller('LoginController', function(LoginResource, $window, JWT, ErrorService, WarningService) {
	var vm = this;
	vm.submitAttempted = false;

	vm.init = function() {
		if (JWT.isValid()) {
			$window.location.href = '/chat.html';
		} else {
			JWT.clear();
		}
	};

	vm.login = function() {
		ErrorService.clear('loginFailedToastId');
		vm.submitAttempted = true;
		if (vm.loginForm.$invalid) {
			WarningService.warn('Please correct the login form.');
		} else {
			LoginResource.login({
				username : vm.username,
				password : vm.password
			}).$promise.then(function(data) {
				var token = data.headers.authorization;
				token = token.substr(7, JWT.length);
				JWT.save(token);
				$window.location.href = '/chat.html';
			}, function() {
				ErrorService.error('Login failed, please correct the login form and try again.', 0, 'loginFailedToastId');
			});
		}
	};

	vm.init();
});