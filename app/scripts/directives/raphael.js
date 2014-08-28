'use strict';
/**
 * @ngdoc directive
 * @name workspaceApp.directive:raphael
 * @description
 * # raphael
 */
angular.module('workspaceApp').directive('raphael', ['$compile', 'County', 'Photospheres', 'Models', 'Galleries', '$q', '$log', '$modal',
    function($compile, County, Photospheres, Models, Galleries, $q, $log, $modal) {
        return {
            link: function(scope, element) {
                
                // initiate raphael document
                var paper = new Raphael(element[0], 710, 910);
                var eire = {};
                
                
                var showPhotosphere = function(spot) {
                    var modalInstance = $modal.open({
                        templateUrl: 'photosphereModal.html',
                        size: 'lg',
                        controller:'PhotosphereModalCtrl',
                        resolve: {
                            spot: function() {
                                return spot;
                            }
                        }
                    });
                    
                     /*modalInstance.opened.then(function(){
                         modalInstance.scope.link = link;
                     });*/
                };
                
                var showModel = function(spot) {
                    var modalInstance = $modal.open({
                        templateUrl: 'modelModal.html',
                        size: 'lg',
                        controller:'ModelModalCtrl',
                        resolve: {
                            spot: function() {
                                return spot;
                            }
                        }
                    });
                };
                
                var showGallery = function(spot) {
                    var modalInstance = $modal.open({
                        templateUrl: 'galleryModal.html',
                        size: 'lg',
                        controller:'GalleryModalCtrl',
                        resolve: {
                            spot: function() {
                                return spot;
                            }
                        }
                    });
                };
                
                var addSpot = function(spot, color, data) {
                   		
                    // get spot type (0 for photosphere, 1 for model, 2 for gallery)
                    	var type = data.type;
                    
                    // define original attributes of the spot
                        var spotAttr={
                            "fill":color,
                            "stroke":"red",
                            "stroke-width":1,
                            "stroke-linejoin":"round",
                            "r":4,
                            "title":spot.name};
                        
                    // attributes when hovered
                        var spotAttrHovered={
                            "fill":color,
                            "stroke":"red",
                            "stroke-width":3,
                            "stroke-linejoin":"round",
                            "r":10,
                            "title":spot.name};

                    if(type === 0) { // photospheres
                        
                        eire[spot.id] = paper.circle(spot.coords.x, spot.coords.y, 4).attr(spotAttr).attr({href:""}).hover(
                            function () {eire[spot.id].animate(spotAttrHovered, 100, 'elastic');},
                            function () {eire[spot.id].animate(spotAttr, 300, 'elastic'); }
                        ).click(function(){showPhotosphere(spot)});
                        
                    } else if (type === 1) { // models
                        
                        eire[spot.id] = paper.circle(spot.coords.x, spot.coords.y, 4).attr(spotAttr).attr({href:""}).hover(
                            function () {eire[spot.id].animate(spotAttrHovered, 100, 'elastic');},
                            function () {eire[spot.id].animate(spotAttr, 300, 'elastic'); }
                        ).click(function(){showModel(spot)});
                        
                    } else if (type === 2) { // galleries
                        
                        eire[spot.id] = paper.circle(spot.coords.x, spot.coords.y, 4).attr(spotAttr).attr({href:""}).hover(
                            function () {eire[spot.id].animate(spotAttrHovered, 100, 'elastic');},
                            function () {eire[spot.id].animate(spotAttr, 300, 'elastic'); }
                        ).click(function(){showGallery(spot)});
                        
                    }
                    

                    
                        
                    
                };

                
                // Catching Json Data
                $q.all([County.get(), Photospheres.get(), Models.get(), Galleries.get()]).then(function(d) {
                    var counties = d[0].data.counties;
                    var photospheres = d[1].data.photospheres;
                    var models = d[2].data.models;
                    var galleries = d[3].data.galleries;
                    
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
                        addSpot(spot, "#003bff", {"type":0});
                    });
                    
                    
                    ///////////////////////////////////
                    //     Placing 3D Models spots   //
                    ///////////////////////////////////
                    angular.forEach(models, function(spot) {
                        addSpot(spot, "#e84702", {"type":1});
                    });
                    
                    
                    ///////////////////////////////////
                    //    Placing galleries spots    //
                    ///////////////////////////////////
                    angular.forEach(galleries, function(spot) {
                        addSpot(spot, "#aad110", {"type":2});
                    });
                    
                });
                
                $compile(element.contents())(scope);
            }
        };
    }
]);