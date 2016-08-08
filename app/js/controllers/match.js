angular.module('myApp').controller('matchController',
		[ '$scope', '$http', '$log', '$location', 'navHelp', 'authService', 'errorService', MatchController ]);

function MatchController($scope, $http, $log, $location, navHelp,
		authService, errorService) {

	$scope.matchDetails = {};
	$scope.orderByField = ['importance','requirement','skillsMatch'];
	$scope.reverseSort = true;
	
	function getMatch() {
		$scope.loadMatchPromise = $http.get(navHelp.url + "/matchAssessment/" + navHelp.requisitionId + "/" + navHelp.employeeId).success(
			function(data, status, headers, config) {
				$scope.matchDetails = data;
				console.log("loaded match for req " + navHelp.requisitionId + " and emp " + navHelp.employeeId + "...");
			}).error(function(data, status, headers, config) {
				errorService.handle(data, status, headers, config);
			});
	};
	
	$scope.clearSearchText = function() {
		$scope.searchText = "";
	};
	
	getMatch();
	
	$scope.set_color = function(detail) {
		if (detail == 0) 
			return {color: "white"}
	}
}