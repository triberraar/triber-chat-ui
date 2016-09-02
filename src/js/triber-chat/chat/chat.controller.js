'use strict';

angular.module('chat.controller', ['ui.router.state'])
    .controller('ChatController', function($state) {
        var vm=this;

        vm.init = function() {
            vm.generalActive = false;
            vm.roomActive = false;
            if($state.is('chat.general')) {
                vm.generalActive = true;
            }
            if($state.is('chat.room')) {
                vm.roomActive = true;
            }
        };

        vm.init();

    });