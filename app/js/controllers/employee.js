'use strict';

angular.module('myApp')
	.controller('employeeCtrl', ['$scope', '$http', '$log', '$location', 'navHelp',
		'authService', 'errorService','listService', employeeCtrl
	]);

function employeeCtrl($scope, $http, $log, $location, navHelp,
	authService, errorService,listService) {
	
	//$scope.ls = listService;
	$scope.employee = {};
	$scope.requisition = {};
	$scope.requisitions = [];
	$scope.qualifications = [];

	$scope.reqFilter = new requisitionFilter();
	$scope.newFile = new auditTrail();
	$scope.newJobTitle = new auditTrail();
	$scope.newLob = new auditTrail();
	$scope.newLocation = new auditTrail();
	$scope.newSkill = new auditTrail();
	
	$scope.toggleFiles = function() {
        $scope.showFiles = !$scope.showFiles;};
	$scope.toggleLob = function() {
        $scope.showLob = !$scope.showLob;};
	$scope.toggleLocation = function() {
        $scope.showLocation = !$scope.showLocation;};
	$scope.toggleAddSkill = function() {
        $scope.showAddSkill = !$scope.showAddSkill;};
	$scope.toggleMatches = function() {
        $scope.requisition = null;};
	$scope.toggleJobTitle = function() {
        $scope.showJobTitle = !$scope.showJobTitle;};
	
	$scope.disableAddFile = function(){
		if (typeof $scope.newFile.filePath == 'undefined') {
			$scope.addFileTooltip = "No file chosen";
			return true;}
		var matches = $scope.employee.employeesFiles.filter(function(datum) {
			return datum.name === $scope.newFile.name;});
		if (matches.length) {
			$scope.addFileTooltip = "Duplicate File Description";
			return true;
		} else {
			$scope.addFileTooltip = "Upload New File";
			return false;}
	};
	$scope.disableAddJobTitle = function(){
		if (typeof $scope.newJobTitle.jobTitle == 'undefined') {
			$scope.addJobTitleTooltip = "Select New Preferred Job Title";
			return true;}
		var matches = $scope.employee.preferredJobTitles.filter(function(datum) {
			return datum.jobTitle.id === $scope.newJobTitle.jobTitle.id;});
		if (matches.length) {
			$scope.addJobTitleTooltip = "Duplicate Job Title";
			return true;
		} else {
			$scope.addJobTitleTooltip = "Add New Preferred Job Title";
			return false;}
	};	
	$scope.disableAddLob = function() {
		if (typeof $scope.newLob.lineOfBusiness == 'undefined') {
			$scope.addLobTooltip = "Select New Preferred LOB";
			return true;}
		var matches = $scope.employee.preferredLobs.filter(function(datum) {
			return datum.lineOfBusiness.id === $scope.newLob.lineOfBusiness.id;});
		if (matches.length) {
			$scope.addLobTooltip = "Duplicate Line of Business";
			return true;
		} else {
			$scope.addLobTooltip = "Add New Preferred LOB";
			return false;}
	};	
	$scope.disableAddLocation = function(){
		if (typeof $scope.newLocation.location == 'undefined') {
			$scope.addLocationTooltip = "Select New Preferred Location";
			return true;}
		var matches = $scope.employee.preferredLocations.filter(function(datum) {
			return datum.location.id === $scope.newLocation.location.id;});
		if (matches.length) {
			$scope.addLocationTooltip = "Duplicate Preferred Location";
			return true;
		} else {
			$scope.addLocationTooltip = "Add New Preferred Location";
			return false;}
	};	
	$scope.disableAddSkill = function(){
		if (typeof $scope.newSkill.skill == 'undefined') {
			$scope.addSkillTooltip = "Select New Skill Set";
			return true;}
		if (typeof $scope.newSkill.userAssessment == 'undefined') {
			$scope.addSkillTooltip = "Select Skill Level";
			return true;}
		var matches = $scope.employee.employeesSkills.filter(function(datum) {
			return datum.skill.id === $scope.newSkill.skill.id;});
		if (matches.length) {
			$scope.addSkillTooltip = "Duplicate Skill Set";
			return true;
		} else {
			$scope.addSkillTooltip = "Add New Skill Set";
			return false;}
	};		
	$scope.disableSkill = function(skill){
		var matches = $scope.employee.employeesSkills.filter(function(datum) {
			return datum.skill.id === skill.id;});
		return matches.length;
	};
	
	function requisitionFilter(){
		this.userId = navHelp.userId;
		this.preferredJobTitle = true;
		this.preferredLob = false;
		this.preferredLocation = true;
	}

	function auditTrail(){
		this.employeeId = navHelp.userId;
		this.created = (new Date()).toISOString();
		this.createdById = navHelp.userId;
		this.modified = (new Date()).toISOString();
		this.modifiedById = navHelp.userId;
	}
	
	$scope.saveEmployee = function() {
		$http.post(navHelp.url + "/employee", $scope.employee).success(
			function(data, status, headers, config) {
				console.log("saved successfully");});
	};
		
	$scope.addJobTitle = function() {
		$http.post(navHelp.url + "/preferredJobTitle", $scope.newJobTitle).success(
			function(data,status,headers,config){
				$scope.newJobTitle.id = data;
				$scope.employee.preferredJobTitles.push($scope.newJobTitle);
				$scope.newJobTitle = new auditTrail();
				$scope.loadRequisitions();
			});
			$scope.addJobTitleTooltip = "Select New Preferred JobTitle";
	};
	
	$scope.addLob = function() {
		$http.post(navHelp.url + "/preferredLob", $scope.newLob).success(
			function(data,status,headers,config){
				$scope.newLob.id = data;
				$scope.employee.preferredLobs.push($scope.newLob);
				$scope.loadRequisitions();
				$scope.newLob = new auditTrail();
			});
			$scope.addLobTooltip = "Select New Preferred LOB";
	};
	
	$scope.addLocation = function(){
		$http.post(navHelp.url + "/preferredLocation", $scope.newLocation).success(
			function(data,status,headers,config){
				$scope.newLocation.id = data;
				$scope.employee.preferredLocations.push($scope.newLocation);
				$scope.loadRequisitions();
				$scope.newLocation = new auditTrail();
			});
			$scope.addLocationTooltip = "Select New Preferred Location";
	};
	
	$scope.addSkill = function(){
		$http.post(navHelp.url + "/employeeSkill", $scope.newSkill).success(
			function(data,status,headers,config){
				$scope.newSkill.id = data;
				$scope.employee.employeesSkills.push($scope.newSkill);
				$scope.newSkill = new auditTrail();
				$scope.loadRequisitions();
			});
			$scope.addSkillTooltip = "Select New Skill Set";
	};
	
	$scope.addSkills = function(skill, level) {
		$scope.newSkill.skill = skill;
		$scope.newSkill.userAssessment = level;
		$http.post(navHelp.url + "/employeeSkill", $scope.newSkill).success(
			function(data,status,headers,config){
				$scope.newSkill.id = data;
				$scope.employee.employeesSkills.push($scope.newSkill);
				$scope.loadRequisitions();
				$scope.newSkill = new auditTrail();});
	};
	
	$scope.removeJobTitle = function(i){
		$http.get(navHelp.url + "/preferredJobTitle/delete/" + i.id).success(
			function(data,status,headers,config){
				var index = $scope.employee.preferredJobTitles.indexOf(i);
				$scope.employee.preferredJobTitles.splice(index,1);
				$scope.loadRequisitions();});
	};
	
	$scope.removeLob = function(i){
		$http.get(navHelp.url + "/preferredLob/delete/" + i.id).success(
			function(data,status,headers,config){
				var index = $scope.employee.preferredLobs.indexOf(i);
				$scope.loadRequisitions();
				$scope.employee.preferredLobs.splice(index,1);});
	};
	
	$scope.removeLocation = function(i){
		$http.get(navHelp.url + "/preferredLocation/delete/" + i.id).success(
			function(data,status,headers,config){
				var index = $scope.employee.preferredLocations.indexOf(i);
				$scope.loadRequisitions();
				$scope.employee.preferredLocations.splice(index,1);});
	};
	
	$scope.removeSkill = function(i) {
		$http.get(navHelp.url + "/employeeSkill/delete/" + i.id).success(
			function(data,status,headers,config){
				var index = $scope.employee.employeesSkills.indexOf(i);
				$scope.loadRequisitions();
				$scope.employee.employeesSkills.splice(index, 1);});
	};

	$scope.changeSkill = function(skill){
		skill.modified = (new Date()).toISOString();
		skill.modifiedById = navHelp.userId;
		$http.post(navHelp.url + "/employeeSkill", skill).success(
			function(data, status, headers, config) {
				console.log("Saved the Employee...");
			}).error(function(data, status, headers, config) {
				errorService.handle(data, status, headers, config);});
		//console.log($scope.employee);
	};
	
	function loadEmployee() {
		$scope.loadEmployeePromise = $http.get(navHelp.url + "/employee/id/" + navHelp.userId).success(
			function(data, status, headers, config) {
				$scope.employee = data;
				$scope.loadEmployeeJob();
				console.log("loaded employee " + navHelp.userId + "...");
			}).error(function(data, status, headers, config) {
				errorService.handle(data, status, headers, config);});
	}
	
	$scope.loadRequisitions = function(){
		clearSearch();
		$scope.loadReqPromise = $scope.getRequisitionListPromise = $http.post(navHelp.url + "/requisition/filter", $scope.reqFilter).success(
			function(data, status, headers, config) {
				$scope.requisitions = data;
			}).error(function(data, status, headers, config) {
				errorService.handle(data, status, headers, config)});
	};
	
	$scope.onSelectRequisition = function(requisition){
		if ($scope.requisition === requisition) {
			clearSearch();
		} else {
			$scope.requisition = requisition;
			$scope.searchString = requisition.number;
			$scope.loadQualifications();			
		}
	};
	
	function clearSearch() {
		console.log("clear search");
		$scope.requisition = null;
		$scope.searchString = "";
	}
	
	$scope.loadQualifications = function(){
		if ($scope.requisition.requisitionId != null)
			$scope.loadQualPromise = $scope.getQualificationListPromise = $http.get(navHelp.url + "/qualification/" + $scope.requisition.requisitionId).success(
				function(data, status, headers, config) {
					$scope.qualifications = data;
					console.log("loaded qualifications for requisition " + $scope.requisition.requisitionId + "...");
				}).error(function(data, status, headers, config) {
					errorService.handle(data, status, headers, config)});
	};
	
	$scope.loadEmployeeJob = function(){
		if($scope.ls.jobTitles != null)
			for(var i = 0; i < $scope.ls.jobTitles.length; i ++)
				if($scope.employee.jobTitle != null)
					if($scope.employee.jobTitle.id == $scope.ls.jobTitles[i].id)
						$scope.employee.jobTitle = $scope.ls.jobTitles[i];
	};
	
	loadEmployee();
	$scope.loadRequisitions();
	
}