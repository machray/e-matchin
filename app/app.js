'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ui.bootstrap', 'ngCookies', 'ngRoute', 'cgBusy', 'toggle-switch'])
	.controller('MasterController',['$scope','listService','$http','navHelp','authService','$location',Master]);
	
function Master($scope,listService,$http,navHelp,authService,$location) {
	
	$scope.ls = listService;
	console.log("master controller is active");
	
	$scope.credentials = {};
	$scope.credentials.password = "";
	$scope.credentials.username = "";
	$scope.credentials.grant_type = "password";
	
	$scope.login = function(){
		console.log("trying to login");
		$scope.loginPromise = $http.post(navHelp.url + "/oauth",$scope.credentials)
			.success(function(data, status, headers, config) {
				// this should return some tokens
				console.log(data);
				console.log("user logged in");
				authService.setSessionToken(data.access_token);
			//	$scope.loadProfile();
				$scope.credentials.username = "";
				$scope.credentials.password = "";
				$scope.ls.loadEverything();
				$location.path("/home")
		}).error(function(data, status, headers, config) {
			console.log(data);
			//$scope.alerts[0].showing = true;
			//$scope.alerts[0].message = data;
			//$scope.credentials.password = "";
		});
		
	};
}