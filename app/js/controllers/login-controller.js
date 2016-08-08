'use strict';

angular.module('myApp').controller(
		'loginController', ['$scope', '$http', '$log', '$location', 'navHelp', 'authService', 'errorService', 
			LoginController]);

function LoginController($scope, $http, $log, $location, navHelp, 
		authService, errorService) {

		$scope.credentials = {};
		$scope.credentials.userName = "";
		console.log("started")
		$scope.login = function(){
			console.log("logging in")
			$location.path("home");
		}

}