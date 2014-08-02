'use strict';

/**
 * @ngdoc service
 * @name workspaceApp.County
 * @description
 * # County
 * Service in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('County', ['$http', '$log', function($http) {

      return{
          get: function() {
              return $http.get('data/geo_data/geo_data.json');
          }
      };
      	
      
  }]);
