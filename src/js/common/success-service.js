'use strict';

angular.module('successService', ['toaster'])
	.factory('SuccessService', function(toaster) {
		return {
			success: function(body, timeout) {
				toaster.pop({
					type : 'success',
					body : body,
					timeout: timeout,
					bodyOutputType: 'trustedHtml'
				});
			}
		};
	});