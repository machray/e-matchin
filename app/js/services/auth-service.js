/**
 * 
 */

angular.module('myApp').service('authService' ,['$location','$cookieStore','$log','$http',AuthService]); 


function AuthService($location,$cookieStore,$log,$http){
	this.sessionToken;
	this.refreshToken;
	this.userInfo = {};
	this.userInfo.roles = []
	
	this.roles ={
			admin : 'Admin',
			svp : 'SVP',
			general : "general",
			hiringLeader : 'Hiring Leader',
			dthr : 'DT HR'
	}
	
	this.adminAuth = function(){
		this.isLoggedIn();
		
		$log.log(this.userInfo);
		var i;
		for(i = 0; i < this.userInfo.roles.length ; i++){
			$log.log("user's roles");
			var role = this.userInfo.roles[i];
			if(role.roleName == this.roles.admin.valueOf()){
				return true;
			}
		}
		return false;		
	}
	
	// if the session token is null grab it from the cookies
	// if the cookie is null return false;
	this.isLoggedIn = function(){
		if(this.sessionToken == null){
			this.sessionToken = $cookieStore.get('ematcin-token');
			$log.log("Session Token is:"+this.sessionToken);
				if(this.sessionToken == null ){
					return false
				}				
			}
		$log.log("Session Token is:"+this.sessionToken);
		$http.defaults.headers.common = {'Authorization': this.sessionToken};
		return true;
	}
	
	
	this.getSessionToken = function(){
		if(isLoggedIn){
			return this.sessionToken;
		}
		return null;
	}
	
	this.requireLogin = function(){
		this.sessionToken = null;
		$location.path("login");
	}
	
	this.setSessionToken = function(token){
		$log.log("settting the sesion token and the header: "+token)
		$http.defaults.headers.common = {'Authorization': token};
		
		
		//$httpProvider.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w'
		//$log.log("http thing is : "+$http.defaults.headers.common['Authorization'])
		$cookieStore.put('ematchin-token',token);
		this.sessionToken = token;
	}
	
	this.login = function(username, password){
		this.setSessionToken(username + password);
		this.userInfo.roles.push(username);
		
	}
	
	this.logout = function(){
		this.setSessionToken(null);
		this.userInfo.roles = [];
		
	}
	
	this.loadProfile = function(){
		$http.get(navHelp.url + "/profile").success(function(data, status, headers, config) {
			$log.log("loading profile with data")
			$log.log(data);
		});
	}



}