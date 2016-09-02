'use strict';

angular.module('securityService', ['jwt', '_'])
	.factory('SecurityService', function(JWT, _) {
		var securityService= {
			getRoles: function() {
				var decodedJwt = JWT.decode();
				return decodedJwt ? decodedJwt.roles : [];
			},
			hasRole: function(role) {
				return _.includes(securityService.getRoles(), role);
			},
			getUsername: function() {
				var decodedJwt = JWT.decode();
				return decodedJwt ? decodedJwt.username : undefined;
			},
			isAdmin: function() {
				return securityService.hasRole('ROLE_ADMIN');
			}
		};
		return securityService;
	})
	.directive('hasPermission', function() {
		return {
			restrict: 'E',
			template: '<div ng-if="securityCtrl.allowed()"><ng-transclude></ng-transclude></div>',
			controller: 'SecurityController',
			controllerAs: 'securityCtrl',
			transclude: true,
			bindToController: {
				permission: '@'
			}
		};
	})
	.controller('SecurityController', function(SecurityService) {
		var vm = this;
		
		vm.allowed = function() {
			return SecurityService.hasRole(vm.permission );
		};
	});