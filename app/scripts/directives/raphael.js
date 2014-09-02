'use strict';
/**
 * @ngdoc directive
 * @name workspaceApp.directive:raphael
 * @description
 * # raphael
 */
angular.module('workspaceApp').directive('raphael', ['$compile', 'County', 'Photospheres', 'Models', 'Galleries', 'Fisheyes', 'Maps', '$q', '$log', '$modal', '$location',
    function($compile, County, Photospheres, Models, Galleries, Fisheyes, Maps, $q, $log, $modal, $location) {
        return {
            scope: {
            	map:"="
        	},
            link: function(scope, element, attrs) {
                
                var map = attrs.map;
                
                // Catching Json Data
                $q.all([County.get(map), Photospheres.get(map), Models.get(map), Galleries.get(map), Fisheyes.get(map), Maps.get(map)]).then(function(d) {
                    
                    var mapData = d[0].data.map;
                    var counties = d[0].data.counties;
                    var photospheres = d[1].data.photospheres;
                    var models = d[2].data.models;
                    var galleries = d[3].data.galleries;
                    var fisheyes = d[4].data.fisheyes;
                    var maps = d[5].data.maps;
                    
                    // initiate raphael document
                    var paper = new Raphael(element[0], mapData.width, mapData.height);
                    var eire = {};
                
                    /////////////////////////////////////////////////
                    //       Functions to populate the map        //
                    ////////////////////////////////////////////////
                    
                    // function to change gps coords into pixel coords
                    var coords = function(coordsGps) {
                        var x, y;
                        var E = coordsGps.E;
                        var N = coordsGps.N;

                        var lat0 = mapData.origin.lat;
                        var long0 = mapData.origin.long;
                        
                        var scale = mapData.scale;
                        var constant = 111.319444; // Earth's perimeter / 360° = number of kilometer by Earth degree
                        
                        x = mapData.origin.x + Math.floor((E-long0) * scale * constant * Math.cos(lat0*Math.PI/180));
                        y = mapData.origin.y - Math.floor((N-lat0) * scale * constant);

                        return {'x':x, 'y':y};
                    };
                
                    // function to load a modal with a photosphere inside
                    var showPhotosphere = function(spot) {
                        $modal.open({
                            templateUrl: 'views/photospheremodal.html',
                            size: 'lg',
                            controller:'PhotosphereModalCtrl',
                            resolve: {
                                spot: function() {
                                    return spot;
                                }
                            }
                        });

                    };
                    
                    // function to load a modal with a fisheye inside (actually just displays a picture)
                    var showFisheye = function(spot) {
                        $modal.open({
                            templateUrl: 'views/fisheyemodal.html',
                            size: 'lg',
                            controller:'FisheyeModalCtrl',
                            resolve: {
                                spot: function() {
                                    return spot;
                                }
                            }
                        });

                    };
                
                    // function to load a modal with a 3d model inside
                    var showModel = function(spot) {
                        /*var modalInstance = */$modal.open({
                            templateUrl: 'views/modelmodal.html',
                            size: 'lg',
                            controller:'ModelModalCtrl',
                            resolve: {
                                spot: function() {
                                    return spot;
                                }
                            }
                        });
                    };

                    // function to load a modal with a pictures gallery inside
                    var showGallery = function(spot) {
                        /*var modalInstance = */$modal.open({
                            templateUrl: 'views/gallerymodal.html',
                            size: 'lg',
                            controller:'GalleryModalCtrl',
                            resolve: {
                                spot: function() {
                                    return spot;
                                }
                            }
                        });
                    };
                    
                    // load another map from a spot
                    var loadMap = function(spot) {
                        $location.path(spot.route);
                        scope.$apply();
                    };
                
                    // function to add a new spot, from spot data, color, and type of the spot
                    var addSpot = function(spot, data) {

                        // get spot type (0 for photosphere, 1 for model, 2 for gallery)
                        var type = data.type;
                        
                        // picSize is the height of spot icons on the map
                        var picSize = 16;


                        var coordinates = coords(spot.coordsGps);

                            // define original attributes of the spot
                            var imgAttr = {
                                'width':picSize,
                                'height':picSize,
                                'x':coordinates.x - picSize/2,
                                'y':coordinates.y - picSize/2,
                                'title':spot.name
                            };

                        	// attributes when hovered
                            var imgHoveredAttr = {
                                'width':picSize*2,
                                'height':picSize*2,
                                'x':coordinates.x - picSize,
                                'y':coordinates.y - picSize,
                                'title':spot.name
                            };

                        if(type === 0) { // photospheres

                            eire[spot.id] = paper
                                .image('images/switch_camera-32.png', coordinates.x - picSize/2, coordinates.y - picSize/2, picSize, picSize)
                                .attr({'cursor':'pointer'})
                                .hover(
                                    function(){eire[spot.id].animate(imgHoveredAttr, 100, 'elastic');},
                                    function(){eire[spot.id].animate(imgAttr, 300, 'elastic');}
                                    )
                            	.click(function(){showPhotosphere(spot);});

                        } else if (type === 1) { // models

                            eire[spot.id] = paper
                                .image('images/geometry-32.png', coordinates.x - picSize/2, coordinates.y - picSize/2, picSize, picSize)
                                .attr({'cursor':'pointer'})
                                .hover(
                                    function(){eire[spot.id].animate(imgHoveredAttr, 100, 'elastic');},
                                    function(){eire[spot.id].animate(imgAttr, 300, 'elastic');}
                                    )
                            	.click(function(){showModel(spot);});

                        } else if (type === 2) { // galleries

                            eire[spot.id] = paper
                                .image('images/compact_camera-32.png', coordinates.x - picSize/2, coordinates.y - picSize/2, picSize, picSize)
                                .attr({'cursor':'pointer'})
                                .hover(
                                    function(){eire[spot.id].animate(imgHoveredAttr, 100, 'elastic');},
                                    function(){eire[spot.id].animate(imgAttr, 300, 'elastic');}
                                    )
                                .click(function(){showGallery(spot);});
                        } else if (type === 3) { // fisheye
                            
                            eire[spot.id] = paper
                                .image('images/invisible-32.png', coordinates.x - picSize/2, coordinates.y - picSize/2, picSize, picSize)
                                .attr({'cursor':'pointer'})
                                .hover(
                                    function(){eire[spot.id].animate(imgHoveredAttr, 100, 'elastic');},
                                    function(){eire[spot.id].animate(imgAttr, 300, 'elastic');}
                                    )
                                .click(function(){showFisheye(spot);});
                        } else if (type === 4) { // other map
                            
                            eire[spot.id] = paper
                                .image('images/map_marker-32.png', coordinates.x - picSize/2, coordinates.y - picSize/2, picSize, picSize)
                                .attr({'cursor':'pointer'})
                                .hover(
                                    function(){eire[spot.id].animate(imgHoveredAttr, 100, 'elastic');},
                                    function(){eire[spot.id].animate(imgAttr, 300, 'elastic');}
                                    )
                                .click(function(){loadMap(spot);});
                        }

                    };

                    
                    ///////////////////////////////////
                    //       Building the map        //
                    ///////////////////////////////////

                    if(mapData.type==='svg') {
                    
                        // for each county
                        angular.forEach(counties, function(county) {

                            // construct border & colors
                            eire[county.name] = paper.path(county.path).attr(county.attr).transform(county.transform).hover(function() {
                                eire[county.name].attr({'fill':'#a8a239'});
                            }, function() {
                                eire[county.name].attr({'fill':county.attr.fill});
                            });

                        });
                    
                    } else if(mapData.type==='png') {
                        
                        eire['background'] = paper.image(mapData.background, 0, 0, mapData.width, mapData.height);
                        
                    }
                    
                    
                    ///////////////////////////////////
                    //   Placing photospheres spots  //
                    ///////////////////////////////////
                    angular.forEach(photospheres, function(spot) {
                        addSpot(spot, {'type':0});
                    });
                    
                    
                    ///////////////////////////////////
                    //     Placing 3D Models spots   //
                    ///////////////////////////////////
                    angular.forEach(models, function(spot) {
                        addSpot(spot, {'type':1});
                    });
                    
                    
                    ///////////////////////////////////
                    //    Placing galleries spots    //
                    ///////////////////////////////////
                    angular.forEach(galleries, function(spot) {
                        addSpot(spot, {'type':2});
                    });
                    
                    ///////////////////////////////////
                    //    Placing fisheyes spots     //
                    ///////////////////////////////////
                    angular.forEach(fisheyes, function(spot) {
                        addSpot(spot, {'type':3});
                    });
                    
                    ///////////////////////////////////
                    //        Placing maps spots     //
                    ///////////////////////////////////
                    angular.forEach(maps, function(spot) {
                        addSpot(spot, {'type':4});
                    });
                    
                });
                
                $compile(element.contents())(scope);
            }
        };
    }
])