angular.module('myApp').service('navHelp', [NavHelpService]); 
	
function NavHelpService(){
	this.dirty = true;
	this.requisitionId = 2255;
	this.url = "http://localhost:8080/ematchin";
     //   this.url = this.url = location.origin+"/emapi";
	this.employeeId = 1;
	this.userId = 1;
};