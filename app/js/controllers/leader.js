'use strict';

angular.module('myApp')
 .controller('leaderCtrl', ['$scope', '$http', '$log', '$location', '$filter', 'navHelp', 'authService',
    'errorService', leaderCtrl]);

function leaderCtrl($scope, $http, $log, $location, $filter, navHelp,
  authService, errorService) {

	$scope.selectedEmployee = {};
	$scope.employeesSkills = {};	
	
	$scope.releaseDate;
	
	$('#datetimepicker').datepicker({
		format: 'mm/dd/yyyy',
		autoclose: true});
	
	function valueHolder(){
		this.id = $scope.selectedEmployee.employeeId;
		this.name = $scope.selectedEmployee.releaseDate;}
	
	function getDirectReportsPromise() {
		$scope.loadDirectReportsPromise = $http.get(navHelp.url + "/directReports/" + navHelp.userId).success(
			function(data, status, headers, config) {
				$scope.employees = data;
				$scope.onSelectEmployee($scope.employees[0]);
				console.log("loaded direct reports...");
			}).error(function(data, status, headers, config) {
				errorService.handle(data, status, headers, config);});}
	
	$scope.onSelectEmployee = function(employee) {
		$scope.onSelectEmployeePromise = $http.get(navHelp.url + "/employeeSkills/" + employee.employeeId).success(
			function(data, status, headers, config) {
				$scope.selectedEmployee = employee;
				$scope.selectedEmployee.employeesSkills = data;
				console.log("loaded selected employee skills...");
			}).error(function(data, status, headers, config) {
				errorService.handle(data, status, headers, config);});};
	
	$scope.saveEmployee = function() {
		$http.post(navHelp.url + "/employee", $scope.selectedEmployee).success(
			function(data, status, headers, config) {
				console.log("saved successfully");});};
	
	$scope.updateAssessment = function(skills) {
		$http.post(navHelp.url + "/employeeSkill", skills).success(
			function(data, status, headers, config) {
				console.log("saved successfully");});};
	
	$scope.updateReleaseDate = function() {
		$scope.releaseDate = new valueHolder();
		$http.post(navHelp.url + "/releaseDate", $scope.releaseDate).success(
			function(data, status, headers, config) {
				console.log("saved successfully");});};

	$scope.updateMatchStatus = function() {
		$http.get(navHelp.url + "/matchStatus/" + $scope.selectedEmployee.employeeId + 
			"/" + $scope.selectedEmployee.statusId).success(
			function(data, status, headers, config) {
				console.log("saved successfully");});};
				
	$scope.$watch('selectedEmployee.releaseDate', function (newValue) {
		$scope.selectedEmployee.releaseDate = $filter('date')(newValue, 'MM/dd/yyyy');});
	
	$scope.getDate = function(item){return new Date(item.date);}
	
	getDirectReportsPromise();	
	
	function calcAverageRating(){
		var a = parseInt(document.getElementById("Goal Rating").value);
		if (isNaN(a)){a = 0;}
		var b = parseInt(document.getElementById("Leadership Rating").value);
		if (isNaN(b)){b = 0;}
		var c = (a+b)/2;
		document.getElementById("Average Rating").value = c;}

		
}