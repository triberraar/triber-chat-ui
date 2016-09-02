'use strict';

angular.module('errorService', ['toaster'])
	.factory('ErrorService', function(toaster) {
		return {
			error: function(body, timeout, toastId) {
				toaster.pop({
					type : 'error',
					body : body || 'Unknown error.',
					timeout: timeout,
					bodyOutputType: 'trustedHtml',
					toastId : toastId
				});
			},
			clear: function(toastId) {
				toaster.clear(undefined, toastId);
			}
		};
	});