'use strict';

angular.module('autoscroll', [])
    .directive('scrollBottom', function () {
        return {
            link: function (scope, element, attr) {
                scope.$watch(function () {
                    return document.getElementById(attr.elementToScroll).scrollHeight; // eslint-disable-line
                }, function () {
                    var scroller = document.getElementById(attr.elementToScroll); // eslint-disable-line
                    scroller.scrollTop = scroller.scrollHeight;
                });
            }
        };
    });