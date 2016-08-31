'use strict';

angular.module('chat.component', ['chat.controller', 'chat.private.component', 'chat.general.component'])
		.component('chat', {
			templateUrl: 'js/triber-chat/chat/chat.html',
			controller: 'ChatController',
			controllerAs: 'chatCtrl'
		});