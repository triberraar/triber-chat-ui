'use strict';

angular.module('localStorage', [])
.factory('$localStorage', function($window) {
	return {
		set: function(key, value) {
			$window.localStorage[key]=value;
		},
		get: function(key) {
			return $window.localStorage[key];
		},
		setObject: function(key, value) {
			this.set(key, angular.toJson(value));
		},
		getObject: function(key) {
			return angular.fromJson(this.get(key));
		},
		remove: function(key) {
			$window.localStorage.removeItem(key);
		}
	};
});