'use strict';

angular.module('connected-user.service', ['connected-user.repository', 'websocket'])
.factory('ConnectedUserService', function(ConnectedUserRepository, Websocket) {

    var loadData = function() {
        ConnectedUserRepository.all();
    };

    Websocket.subscribe('/topic/user/connected', loadData);
    Websocket.subscribe('/topic/user/disconnected', loadData);

    Websocket.onConnected(loadData);

    loadData();

    var connectedUserService = {
        getUsers: function() {
            return ConnectedUserRepository.users;
        }
    };

    return connectedUserService;
});
