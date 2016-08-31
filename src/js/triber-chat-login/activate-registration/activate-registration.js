'use strict';

angular.module('activateRegistration', ['ngResource', 'ui.router.state', 'warningService', 'errorService', 'successService'])
.factory('ActivateUserResource', function($resource) {
	return $resource('/user/:userId/activate', {}, {
		register : {
			method : 'PUT'
		}
	});
})
.controller('ActivateRegistrationController', function($state, $stateParams, ActivateUserResource, WarningService, ErrorService, SuccessService) {
		var vm = this;
	vm.submitAttempted = false;
	
	vm.activateRegistration = function() {
		vm.submitAttempted = true;
		if (vm.activateRegistrationForm.$invalid) {
			WarningService.warn('Please correct the activate form.');
			return;
		}
		ActivateUserResource.register({userId: $stateParams.userId}, {password: vm.password}).$promise.then(function(){
			SuccessService.success('You are activated');
			$state.go('login');
		}, function(data){
			var toasterBody;
			if(data.data.errorCode) {
					toasterBody = data.data.errorCode;
			} 
			ErrorService.error(toasterBody);
		}); 
	};
	
});