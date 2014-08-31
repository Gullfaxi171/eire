'use strict';

/**
 * @ngdoc service
 * @name workspaceApp.models
 * @description
 * # models
 * Factory in the workspaceApp.
 */
angular.module('workspaceApp')
  .factory('Models', ['$http', function($http) {

      return{
          get: function(map) {
              return $http.get('data/' + map + '/3dmodels.json');
          }
      };
      	
      
  }]);
