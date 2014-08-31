'use strict';

/**
 * @ngdoc service
 * @name workspaceApp.County
 * @description
 * # County
 * Service in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('County', ['$http', function($http) {

      return{
          get: function(map) {
              return $http.get('data/' + map + '/geo_data.json');
          }
      };
      	
      
  }]);
