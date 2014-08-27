'use strict';
/**
 * @ngdoc function
 * @name workspaceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workspaceApp
 */
angular.module('workspaceApp').controller('MainCtrl', function($scope, $modal, $log) {
    /*
    // Open a show3D Modal
    $scope.show3D = function() {
        $modal.open({
            templateUrl: 'countyModal.html',
            size: 'lg'
        });
    };
    
    // Open a photosphere modal
    $scope.showPhotosphere = function() {
        $modal.open({
            templateUrl: 'photosphereModal.html',
            size: 'lg'
        });
    };
    
    // Open modal when clicking on spot
    var spot = angular.element('#photosphere_001');
    
    $log.log(spot);
    
    spot.on("click", function (event) {
        $scope.showPhotosphere();
    });*/
    
});

angular.module('workspaceApp').controller('PhotosphereModalCtrl', function($scope, link) {
    $scope.path = link;
});