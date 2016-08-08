// Declare app level module which depends on views, and components
angular.module('myApp').config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'templates/dashboard.html'
			}).when('/employee', {
				templateUrl: 'templates/employee/employee.html',
				controller: 'employeeCtrl'
			}).when('/leader', {
				templateUrl: 'templates/leader/leader.html',
				controller: 'leaderCtrl'
			}).when('/joblist', {
				templateUrl: 'templates/jobList/jobList.html',
				controller: 'requisitionListController'
			}).when('/job', {
				templateUrl: 'templates/job/job.html',
				controller: 'requisitionDetailController'
			}).when('/match', {
				templateUrl: 'templates/match/match.html',
				controller: 'matchController'
			}).when('/login',{
				templateUrl:'templates/login.html'
				//controller: "loginController"
			}).otherwise({
				redirectTo: '/home'				
			});
	}]);