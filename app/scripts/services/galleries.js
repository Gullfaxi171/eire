'use strict';

/**
 * @ngdoc service
 * @name workspaceApp.galleries
 * @description
 * # galleries
 * Factory in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('Galleries', ['$http', function($http) {

      return{
          get: function(map) {
              return $http.get('data/' + map + '/galleries.json');
          }
      };
      	
      
  }]);
