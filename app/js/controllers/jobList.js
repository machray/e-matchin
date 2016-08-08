angular.module('myApp').controller('requisitionListController', 
	['$scope', '$http', '$log', '$location', 'navHelp', 'authService', 'errorService', RequisitionController ]);

function RequisitionController($scope, $http, $log, $location, navHelp,
		authService, errorService) {

	$scope.requisitions = [];
	
	$scope.loadRequisitionList = function() {
		$scope.reqListPromise = $http.get(navHelp.url + "/requisition").success(
			function(data, status, headers, config) {
				$scope.requisitions = data;
				console.log("loaded requisitions...");
			}).error(function(data, status, headers, config) {
				errorService.handle(data, status, headers, config)});};
	
	$scope.onSelectRequisition = function(requisition) {
		navHelp.requisitionId = requisition.requisitionId;
		$location.path("/job");}
	
	$scope.loadRequisitionList();

}