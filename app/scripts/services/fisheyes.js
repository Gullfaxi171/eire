'use strict';

/**
 * @ngdoc service
 * @name workspaceApp.fisheyes
 * @description
 * # fisheyes
 * Factory in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('Fisheyes', ['$http', function($http) {

      return{
          get: function(map) {
              return $http.get('data/' + map + '/fisheyes.json');
          }
      };
      	
      
  }]);