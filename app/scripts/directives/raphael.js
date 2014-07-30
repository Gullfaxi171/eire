'use strict';

/**
 * @ngdoc directive
 * @name workspaceApp.directive:raphael
 * @description
 * # raphael
 */
angular.module('workspaceApp')
  .directive('raphael', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the raphael directive');
      }
    };
  });
