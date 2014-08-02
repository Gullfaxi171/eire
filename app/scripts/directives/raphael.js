'use strict';
/**
 * @ngdoc directive
 * @name workspaceApp.directive:raphael
 * @description
 * # raphael
 */
angular.module('workspaceApp').directive('raphael', ['$compile', 'County',
    function($compile, County) {
        return {
            link: function(scope, element) {
                // catching geo data
                County.get().then(function(d) {
                    var counties = d.data.counties;
                    
                    // initiate raphael document
                    var paper = new Raphael(element[0], 710, 910);
                    var eire = {};
                    
                    // for each county
                    angular.forEach(counties, function(county) {
                        
                        // construct border & colors
                        eire[county.name] = paper.path(county.path).attr(county.attr).transform(county.transform).hover(function() {
                            eire[county.name].attr({'fill':'#a8a239'});
                        }, function() {
                            eire[county.name].attr({'fill':county.attr.fill});
                        });
                        
                    });
                });
                
                $compile(element.contents())(scope);
            }
        };
    }
]);