'use strict';

angular.module('warningService', ['toaster'])
	.factory('WarningService', function(toaster) {
		return {
			warn: function( body, timeout) {
				toaster.pop({
					type : 'warning',
					body : body,
					timeout: timeout,
					bodyOutputType: 'trustedHtml'
				});
			}
		};
	});