angular.module('myApp').directive('resumeUpload',  function() {
    return {
        restrict: 'E',
        templateUrl:'templates/fileupload.html',
        controller:'myCtrl',
        controllerAs:'myCtrl'
    };
});