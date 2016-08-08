angular.module('myApp').service('errorService', ['$log','$location','authService', ErrorService ]);

function ErrorService($log,$location,authService) {
	this.handle = function(data, status, headers, config) {
		$log.log(data);
		if (status == 401) {
			// log the user out if the response is 401
			authService.logout();
			$location.path("/login");
		}
	}
}
