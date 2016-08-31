'use strict';

angular.module('passwordCompare', [])
.directive('passwordCompare', function() {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: '=passwordCompare'
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch('otherModelValue', function() {
                ngModel.$validate();
            });
        }
    };
});