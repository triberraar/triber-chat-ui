'use strict';

angular.module('chat.private.service', ['websocket', '_', 'securityService', 'notificationService'])
    .factory('PrivateChatService', function (Websocket, _, MessageConfig, SecurityService, NotificationService) {
        var show = false, selectedUser, messages= {};

        Websocket.subscribe('/user/topic/message/private', function(message) {
            var place;
            if(message.from === SecurityService.getUsername()) {
                message.own = true;
                place = message.to;
            } else if(message.to === SecurityService.getUsername()) {
                message.own = false;
                place = message.from;
            }
            if(!messages[place]) {
                messages[place] = { messages: [], unread: 0};
            }
            messages[place].messages.push(message);
            messages[place].messages = _.takeRight(messages[place].messages, MessageConfig.numberOfMessages);
            if(!message.own && !selectedUser) {
                messages[place].unread++;
            } else if(!message.own && selectedUser && selectedUser.username !== message.from) {
                messages[place].unread++;
            }
            var unreadMessagesExist = _.find(messages, function(message) {
                return message.unread > 0;
            });
            if(unreadMessagesExist) {
                NotificationService.addNotification({ key: 'privateMessage', message: 'You received private messages.', cssClass: 'fa fa-comment fa-fw', admin: false});
            }
        });

        var privateChatService = {

            chatWithUser: function(user) {
                if(messages[user.username]) {
                    messages[user.username].unread = 0;
                }
                var unreadMessagesExist = _.find(messages, function(message) {
                    return message.unread > 0;
                });
                if(!unreadMessagesExist) {
                    NotificationService.removeNotification('privateMessage');
                }
                show = true;
                selectedUser = user;
            },
            hide: function() {
                show = false;
                selectedUser = undefined;
            },
            get show() {
                return show;
            },
            get selectedUser() {
                return selectedUser;
            },
            get _messages() {
                return messages;
            },
            getMessagesFromSelectedUser: function() {
                if(selectedUser && messages[selectedUser.username]) {
                    return messages[selectedUser.username].messages;
                }
            },
            getNumberOfUnreadMessagesForUser: function(user) {
                if(messages[user.username]) {
                    return messages[user.username].unread || 0;
                }
                return 0;

            }
        };

        return privateChatService;
    });