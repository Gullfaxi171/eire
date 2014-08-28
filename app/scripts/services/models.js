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
          get: function() {
              return $http.get('data/3dmodels.json');
          }
      };
      	
      
  }]);
