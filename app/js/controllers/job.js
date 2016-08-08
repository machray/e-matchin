'use strict';

angular.module('myApp').controller('requisitionDetailController',
	['$scope', '$http', '$log', '$location', 'navHelp', 'authService', 'errorService', RequisitionController]);

function RequisitionController($scope, $http, $log, $location, navHelp, 
		authService, errorService) {

	$scope.pmOrderByField = ['preferredLocation','matchPercent'];
	$scope.jrOrderByField = ['importance.id','requirement.id'];
	$scope.reverseSort = true;
	
	$scope.requisition = {};
	$scope.newSkill = new auditTrail();
	$scope.newHiringLeader = new employee();
	$scope.newRecruiter = new employee();
	
	// $scope.numberUnique = true;
	// $scope.nameContains = [];
	
	$scope.toggleAddSkill = function() {
        $scope.showAddSkill = !$scope.showAddSkill;};

	$scope.disableAddSkill = function(){
		if (typeof $scope.newSkill.skill == 'undefined') {
			$scope.addSkillTooltip = "Select New Skill Set";
			return true;}
		if (typeof $scope.newSkill.requirement == 'undefined') {
			$scope.addSkillTooltip = "Select Skill Requirement";
			return true;}
		if (typeof $scope.newSkill.importance == 'undefined') {
			$scope.addSkillTooltip = "Select Skill Importance";
			return true;}
		var matches = $scope.requisition.qualifications.filter(function(datum) {
			return datum.skill.id === $scope.newSkill.skill.id;});
		if (matches.length) {
			$scope.addSkillTooltip = "Duplicate Skill Set";
			return true;
		} else {
			$scope.addSkillTooltip = "Add New Skill Set";
			return false;}
	};
	
	$scope.addSkill = function(){
		$scope.addSkillPromise = $http.post(navHelp.url + "/qualification", $scope.newSkill).success(
			function(data,status,headers,config){
				$scope.newSkill.id = data;
				$scope.requisition.qualifications.push($scope.newSkill);
				$scope.newSkill = new auditTrail();
			});
			$scope.addSkillTooltip = "Select New Skill Set";
	};
	
	$scope.removeSkill = function(i) {
		$http.get(navHelp.url + "/qualification/delete/" + i.id).success(
			function(data,status,headers,config){
				var index = $scope.requisition.qualifications.indexOf(i);
				$scope.requisition.qualifications.splice(index, 1);});
	};
		
	function employee(){}
	
	function auditTrail(){
		this.requisitionId = navHelp.requisitionId;
		this.created = (new Date()).toISOString();
		this.createdById = navHelp.userId;
		this.modified = (new Date()).toISOString();
		this.modifiedById = navHelp.userId;
	}
	
	$scope.saveRequisition = function(){
		$http.post(navHelp.url + "/requisition", $scope.requisition).success(
			function(data,status,headers,config){
				console.log("saved successfully");});
	};
	
	$scope.changeSkill = function(skill){
		skill.modified = (new Date()).toISOString();
		skill.modifiedById = navHelp.userId;
		$http.post(navHelp.url + "/qualification", skill);
	};
	
	$scope.saveSkill = function(){
		$scope.newSkill.requisitionId = navHelp.requisitionId;
		$http.post(navHelp.url + "/qualification", $scope.newSkill).success(
			function(data,status,headers,config){
				$scope.requisition.qualifications.push(data);
				$scope.newSkill = new auditTrail();
				console.log("saved successfully");});
	};	
	
	$scope.loadRequisition = function() {
		$scope.loadReqPromise = $http.get(navHelp.url + "/requisition/id/" + navHelp.requisitionId).success(
				function(data, status, headers, config) {
					$scope.requisition = data;
					console.log("loaded requisition " + navHelp.requisitionId + "...");
				}).error(function(data, status, headers, config) {
					errorService.handle(data, status, headers, config);});
	};
		
	$scope.onSelectMatch = function(match) {
		navHelp.employeeId = match.userId;
		navHelp.requisitionId = match.requisitionId;
		$location.path("/match");
	};
	
	$scope.loadRequisition();
	
}