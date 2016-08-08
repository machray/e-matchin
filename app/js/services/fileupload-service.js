angular.module('myApp').service('fileUploadService' ,['$http',FileUploadService]); 

	
function FileUploadService($http){
    this.uploadFileToUrl = function(file, uploadUrl , success , exception){
        var fd = new FormData();
        console.log(file);
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
        	success(data);
        })
        .error(function(){
        });
    }
};