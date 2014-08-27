'use strict';
/**
 * @ngdoc directive
 * @name workspaceApp.directive:raphael
 * @description
 * # raphael
 */
angular.module('workspaceApp').directive('raphael', ['$compile', 'County', 'Photospheres', '$q', '$log', '$modal',
    function($compile, County, Photospheres, $q, $log, $modal) {
        return {
            link: function(scope, element) {
                
                // initiate raphael document
                var paper = new Raphael(element[0], 710, 910);
                var eire = {};
                
                
                var showPhotosphere = function(link) {
                    var modalInstance = $modal.open({
                        templateUrl: 'photosphereModal.html',
                        size: 'lg',
                        controller:'PhotosphereModalCtrl',
                        resolve: {
                            link: function() {
                                return link;
                            }
                        }
                    });
                    
                     /*modalInstance.opened.then(function(){
                         modalInstance.scope.link = link;
                     });*/
                };
                
                var addSpot = function(spot, color) {
                   
                        var spotAttr={
                            "fill":color,
                            "stroke":"red",
                            "stroke-width":1,
                            "stroke-linejoin":"round",
                            "r":4,
                            "title":spot.name};
                        
                        var spotAttrHovered={
                            "fill":color,
                            "stroke":"red",
                            "stroke-width":3,
                            "stroke-linejoin":"round",
                            "r":10,
                            "title":spot.name};

                        eire[spot.id] = paper.circle(spot.coords.x, spot.coords.y, 4).attr(spotAttr).attr({href:""}).hover(
                            function () {eire[spot.id].animate(spotAttrHovered, 100, 'elastic');},
                            function () {eire[spot.id].animate(spotAttr, 300, 'elastic'); }
                        ).click(function(){showPhotosphere(spot.filename)});
                    
                        
                    
                };

                
                // Catching Json Data
                $q.all([County.get(), Photospheres.get()]).then(function(d) {
                    var counties = d[0].data.counties;
                    var photospheres = d[1].data.photospheres;
                    
                    ///////////////////////////////////
                    //       Building the map        //
                    ///////////////////////////////////

                    
                    // for each county
                    angular.forEach(counties, function(county) {
                        
                        // construct border & colors
                        eire[county.name] = paper.path(county.path).attr(county.attr).transform(county.transform).hover(function() {
                            eire[county.name].attr({'fill':'#a8a239'});
                        }, function() {
                            eire[county.name].attr({'fill':county.attr.fill});
                        });
                        
                    });
                    
                    
                    ///////////////////////////////////
                    //   Placing photospheres spots  //
                    ///////////////////////////////////
                    angular.forEach(photospheres, function(spot) {
                        addSpot(spot, "#003bff");
                    });
                    
                });
                
                $compile(element.contents())(scope);
            }
        };
    }
]);