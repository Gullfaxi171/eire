"use strict";angular.module("workspaceApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("workspaceApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("workspaceApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("workspaceApp").factory("County",["$http",function(a){return{get:function(){return a.get("data/geo_data.json")}}}]),angular.module("workspaceApp").directive("raphael",["$compile","County",function(a,b){return{link:function(c,d){b.get().then(function(a){var b=a.data.counties,c=new Raphael(d[0],710,910),e={};angular.forEach(b,function(a){e[a.name]=c.path(a.path).attr(a.attr).transform(a.transform).hover(function(){e[a.name].attr({fill:"#a8a239"})},function(){e[a.name].attr({fill:a.attr.fill})})})}),a(d.contents())(c)}}}]),angular.module("workspaceApp").service("Spots",function(){});