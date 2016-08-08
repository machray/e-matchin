
angular.module('myApp').controller('myCtrl', ['$scope', 'fileUploadService', function($scope, fileUploadService){
    
	$scope.myFile = '';
	$scope.resumeExists = false;

    $scope.fileUpload = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "http://localhost:8080/ematchin/upload";
        fileUploadService.uploadFileToUrl(file, uploadUrl, success, error);
    };

   var success = function(data){
    	 $scope.myFile = data.filePath;
    	 $scope.resumeExists = true;
    }

    var error = function(data){

    }
    
}]);
