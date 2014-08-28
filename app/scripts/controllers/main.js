'use strict';
/**
 * @ngdoc function
 * @name workspaceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workspaceApp
 */
angular.module('workspaceApp').controller('MainCtrl', ['$scope', function($scope) {

    
}]);

angular.module('workspaceApp').controller('PhotosphereModalCtrl', ['$scope', 'spot', function($scope, spot) {
    $scope.spot = spot;
}]);

angular.module('workspaceApp').controller('ModelModalCtrl', ['$scope', 'spot', '$sce',  function($scope, spot, $sce) {
    $scope.spot = spot;
    $scope.model = $sce.trustAsHtml('<iframe width="640" height="480" src="' + $scope.spot.path + '" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>');

}]);

angular.module('workspaceApp').controller('GalleryModalCtrl', ['$scope', 'spot', function($scope, spot) {
    $scope.spot = spot;
    $scope.interval = 5000;
}]);