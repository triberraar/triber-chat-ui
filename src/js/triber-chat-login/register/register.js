'use strict';

angular.module('register', ['passwordCompare', 'vcRecaptcha', 'ngResource', 'warningService', 'errorService', 'successService'])
.factory('RegisterResource', function($resource) {
	return $resource('/register', {}, {
		register : {
			method : 'POST'
		}
	});
})
.controller('RegisterController', function(vcRecaptchaService, RegisterResource, ErrorService, WarningService, SuccessService) {
		var vm = this;
	vm.submitAttempted = false;
	vm.registering = false;
	
	vm.register = function() {
		vm.submitAttempted = true;
		if (vm.registerForm.$invalid) {
			WarningService.warn('Please correct the register form.');
			return;
		}
		vm.registering = true;
		var registration = {
				username: vm.username,
				email: vm.email,
				password: vm.password,
				captcha: vm.recaptcha
		};
		RegisterResource.register(registration).$promise.then(function(){
			SuccessService.success('Registration successful, you will receive an email.');
			vm.registering = false;
		}, function(data){
			vm.registering = false;
			vm.refreshRecaptcha();
			var toasterBody = undefined;
			if(data.data.errors) {
				angular.forEach(data.data.errors, function(error) {
					toasterBody = toasterBody || '';
					toasterBody = toasterBody + error + '<br>';
				});
			} 
			ErrorService.error(toasterBody);
		});
	};
	
	vm.recaptchaCreated = function(widgetId) {
		vm.widgetId = widgetId;
	};
	
	vm.refreshRecaptcha = function() {
		vcRecaptchaService.reload(vm.widgetId);
		vm.recaptcha = undefined;
	};
	
});