'use strict';
/**
 * @ngdoc function
 * @name workspaceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workspaceApp
 */
angular.module('workspaceApp').controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

    // Using the tabs of the navbar
    $rootScope.activeTab = 'main';
    $rootScope.setTab = function(tab) {
        $rootScope.activeTab = tab;
    };
    
    $rootScope.isActive = function(tab) {
        if($rootScope.activeTab === tab) {
            return 'active';
        } else {
            return '';
        };
    }
    
}]);

angular.module('workspaceApp').controller('PhotosphereModalCtrl', ['$scope', 'spot', '$modalInstance', function($scope, spot, $modalInstance) {
    $scope.spot = spot;
    $scope.closeModal = function() {
        $modalInstance.close();
    };
}]);

angular.module('workspaceApp').controller('FisheyeModalCtrl', ['$scope', 'spot', '$modalInstance', function($scope, spot, $modalInstance) {
    $scope.spot = spot;
    $scope.closeModal = function() {
        $modalInstance.close();
    };
}]);

angular.module('workspaceApp').controller('ModelModalCtrl', ['$scope', 'spot', '$sce', '$modalInstance', function($scope, spot, $sce, $modalInstance) {
    $scope.spot = spot;
    $scope.model = $sce.trustAsHtml('<iframe width="640" height="480" src="' + $scope.spot.path + '" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>');
    $scope.closeModal = function() {
        $modalInstance.close();
    };
}]);

angular.module('workspaceApp').controller('GalleryModalCtrl', ['$scope', 'spot', '$modalInstance', function($scope, spot, $modalInstance) {
    $scope.spot = spot;
    $scope.interval = 5000;
    $scope.closeModal = function() {
        $modalInstance.close();
    };
    
    var pictures = spot.pictures;
    
    $scope.slides = [];
    
    angular.forEach(pictures, function(picture) {
        $scope.slides.push({
            image:picture.path,
            text:picture.description
        });
    });
}]);

