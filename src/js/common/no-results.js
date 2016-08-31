'use strict';

angular.module('noResults', [])
.directive('noResults', function() {
	return {
		template: '<div ng-if="noResultsCtrl.render" class="alert alert-warning"> No results found.</div>',
		controller: function() {},
		controllerAs: 'noResultsCtrl',
		bindToController: {
			render: '='
		}
	};
});