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
          get: function(map) {
              return $http.get('data/' + map + '/photospheres.json');
          }
      };
      
  }]);
