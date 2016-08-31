'use strict';

describe('chat.controller', function() {

    var $controller;

    var stateMock = {
        is: function() {
        }
    };

    beforeEach(module('chat.controller'));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    var createController = function() {

        return $controller('ChatController', {
            $state: stateMock
        });
    };

    describe('init', function() {
        it('should set room active when the state is the room state', function() {
            spyOn(stateMock, 'is').and.callFake(function(state) {
               return state === 'chat.room';
            });

            var controller = createController();

            expect(controller.generalActive).toEqual(false);
            expect(controller.roomActive).toEqual(true);
        });
        it('should set general active when the state is the general state', function() {
            spyOn(stateMock, 'is').and.callFake(function(state) {
                return state === 'chat.general';
            });

            var controller = createController();

            expect(controller.generalActive).toEqual(true);
            expect(controller.roomActive).toEqual(false);
        });
    });
});