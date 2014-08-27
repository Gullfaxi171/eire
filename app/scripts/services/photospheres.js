'use strict';

/**
 * @ngdoc service
 * @name workspaceApp.photospheres
 * @description
 * # photospheres
 * Factory in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('Photospheres', ['$http', function ($http) {

      return{
          get: function() {
              return $http.get('data/photospheres.json');
          }
      };
      
  }]);
