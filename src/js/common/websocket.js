'use strict';

angular.module('websocket', ['jwt'])
.factory('Websocket', function(JWT, $rootScope, $timeout) {
	var websocket = {};
	var subscriptions = [];
	var onConnected = [];
	var reconnectTimeout;


	function executeOnConnectionFunctions() {
		angular.forEach(onConnected, function(eventFunction) {
			eventFunction();
		});
	}

	function subscribe(channel, eventFunction) {
		websocket.stomp.subscribe(channel, function(message) {
			eventFunction(angular.fromJson(message.body));
			$rootScope.$digest();
		});
	}
	
	websocket.connect = function() {
		websocket.client = new SockJS('/chat?jwt=' + JWT.get()); // eslint-disable-line
		websocket.stomp = Stomp.over(websocket.client); // eslint-disable-line
		//websocket.stomp.debug = null;
		websocket.stomp.connect({}, function() {
			executeOnConnectionFunctions();
			$timeout.cancel(reconnectTimeout);
			angular.forEach(subscriptions, function(subscription) {
				subscribe(subscription.channel, subscription.eventFunction);

			});
		}, function() {
			$rootScope.$apply(function() {
				reconnectTimeout = $timeout(function() {
					websocket.connect();
				}, 5000);
			});
		});
	};
	
	websocket.subscribe = function(channel, eventFunction) {

		subscriptions.push({channel: channel, eventFunction: eventFunction});
		if(websocket.stomp.connected) {
			subscribe(channel, eventFunction);
		}
	};
	
	websocket.connected = function() {
		return websocket.stomp && websocket.stomp.connected;
	};
	
	websocket.send = function(channel, message) {
		if(websocket.connected) {
			websocket.stomp.send(channel, {}, angular.toJson(message));
		}
	};

	websocket.onConnected = function(eventFunction) {
		onConnected.push(eventFunction);
	};
	
	return websocket;
});