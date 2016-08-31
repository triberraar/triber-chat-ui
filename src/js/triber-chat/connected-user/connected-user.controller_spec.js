'use strict';

describe('connected-user.controller', function() {

    var $controller, connectedUserController;

    var errorServiceMock = {
        error: function() {}
    }, connectedUserServiceMock = {
        getUsers: function() { return 'users'; }
    }, privateChatServiceMock = {
        chatWithUser: function() {},
        getNumberOfUnreadMessagesForUser: function() {return 1; }
    }, securityServiceMock = {
        getUsername: function() { return 'username'; }
    };

    beforeEach(module('connected-user.controller'));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    beforeEach(function() {
        connectedUserController = $controller('ConnectedUserController', {
            ErrorService : errorServiceMock,
            ConnectedUserService: connectedUserServiceMock,
            PrivateChatService: privateChatServiceMock,
            SecurityService: securityServiceMock
        });
    });

    describe('users', function() {
        it('should return all users', function() {
            expect(connectedUserController.users()).toEqual('users');
        });
    });
    describe('clickedUser', function() {
        it('should pop an error when clicked yourself', function() {
            spyOn(errorServiceMock, 'error');

            connectedUserController.clickedUser({username: 'username'});

            expect(errorServiceMock.error).toHaveBeenCalled();
            expect(errorServiceMock.error).toHaveBeenCalledWith('Can\'t chat with yourself');
        });
        it('should set the selecteduser for private chat', function() {
            spyOn(privateChatServiceMock, 'chatWithUser');

            connectedUserController.clickedUser({username: 'other'});

            expect(privateChatServiceMock.chatWithUser).toHaveBeenCalled();
            expect(privateChatServiceMock.chatWithUser).toHaveBeenCalledWith({username: 'other'});
        });
    });
    describe('getNumberOfUnreadMessagesForUser', function() {
        it('should return the number of unread messages for a user', function() {
            spyOn(privateChatServiceMock, 'getNumberOfUnreadMessagesForUser').and.callThrough();

            expect(connectedUserController.getNumberOfUnreadMessagesForUser('user')).toEqual(1);
            expect(privateChatServiceMock.getNumberOfUnreadMessagesForUser).toHaveBeenCalled();
            expect(privateChatServiceMock.getNumberOfUnreadMessagesForUser).toHaveBeenCalledWith('user');
        });
    });
});