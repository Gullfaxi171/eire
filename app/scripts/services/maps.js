'use strict';

/**
 * @ngdoc service
 * @name workspaceApp.maps
 * @description
 * # maps
 * Factory in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('Maps', ['$http', function ($http) {

      return{
          get: function(map) {
              return $http.get('data/' + map + '/maps.json');
          }
      };
      
  }]);
