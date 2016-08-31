'use strict';

angular.module('notificationService', ['websocket', 'securityService', 'ngResource'])
.factory('UnvalidatedUserResource', function($resource) {
		return $resource('/user/unvalidated', {}, {
			existsUnvalidated : {
				method : 'GET'
			}
		});
	})
.factory('NotificationService', function(UnvalidatedUserResource, Websocket, $rootScope, SecurityService, _) {
	var notifications = {};
	
	if(SecurityService.hasRole('ROLE_ADMIN')) {
		Websocket.subscribe('/topic/notifications/registeredUser', checkUnvalidatedUsers);
		Websocket.subscribe('/topic/notifications/validatedUser', checkUnvalidatedUsers);
		Websocket.onConnected(checkUnvalidatedUsers);
	}
	
	function checkUnvalidatedUsers() {
		UnvalidatedUserResource.existsUnvalidated().$promise.then(function() {
			notificationService.addNotification({ key: 'unvalidatedUser',  message: 'There are unvalidated users.', cssClass: 'fa fa-user fa-fw', admin: true, link: 'user'});
		}, function() {
			notificationService.removeNotification('unvalidatedUser');
		});
	}
	
	var notificationService = {
			addNotification : function(notification) {
				notifications[notification.key] = notification;
			},
			removeNotification: function(key) {
				if(notifications[key]) {
					delete notifications[key];
				}
			},
			checkUnvalidatedUsers: checkUnvalidatedUsers,
			notifications : function() {
				if(SecurityService.isAdmin()) {
					return notifications;
				} else {
					return _.filter(notifications, function(notification){ return !notification.admin; });
				}
			},
			numberOfNotifications: function() {
				return _.size(notificationService.notifications());
			},
			notification: function(key) {
				return notifications[key];
			}
	};
	return notificationService;
});