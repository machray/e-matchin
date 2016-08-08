'use strict';

angular.module('myApp')
    .service('listService', ['$http', '$log', '$location', 'navHelp', 'errorService', ListController]);

function ListController($http, $log, $location, navHelp, errorService) {

    console.log("list service fired up");

    this.jobTitles = [];
    this.locations = [];
    this.lobs = [];
    this.skillSet = [];
    this.ratings = [];
    this.importance = [];
    this.employees = [];
    this.matchStatus = [];

    this.loadMatchStatus = function(self) {
        $http.get(navHelp.url + "/matchStatus")
            .success(function(data, status, headers, config) {
                self.matchStatus = data;
            })
            .error(function(data, status, headers, config) {
                errorService.handle(data, status, headers, config);
            });
    };

    this.loadJobTitles = function(self) {
        $http.get(navHelp.url + "/jobTitles")
            .success(
                function(data, status, headers, config) {
                    self.jobTitles = data;
                    console.log("loaded job titles...");
                }).error(function(data, status, headers, config) {
                errorService.handle(data, status, headers, config);
            });
    };

    this.loadLocations = function(self) {
        $http.get(navHelp.url + "/locations").success(
            function(data, status, headers, config) {
                self.locations = data;
                console.log("loaded Locations...");
            }).error(function(data, status, headers, config) {
            errorService.handle(data, status, headers, config);
        });
    };

    this.loadLobs = function(self) {
        $http.get(navHelp.url + "/linesOfBusiness").success(
            function(data, status, headers, config) {
                self.lobs = data;
                console.log("loaded lobs...")
            }).error(function(data, status, headers, config) {
            errorService.handle(data, status, headers, config);
        });
    };

    this.loadSkillSet = function(self) {
        $http.get(navHelp.url + "/skillSets").success(
            function(data, status, headers, config) {
                self.skillSet = data;
                console.log("loaded skillSet...");
            }).error(function(data, status, headers, config) {
            errorService.handle(data, status, headers, config);
        });
    };

    this.loadRatings = function(self) {
        $http.get(navHelp.url + "/ratings").success(
            function(data, status, headers, config) {
                self.ratings = data;
                console.log("loaded ratings...");
            }).error(function(data, status, headers, config) {
            errorService.handle(data, status, headers, config);
        });
    };

    this.loadImportance = function(self) {
        $http.get(navHelp.url + "/importance").success(
            function(data, status, headers, config) {
                self.importance = data;
                console.log("loaded importance...");
            }).error(function(data, status, headers, config) {
            errorService.handle(data, status, headers, config);
        });
    };

    this.loadEmployees = function(self) {
        $http.get(navHelp.url + "/employees").success(
            function(data, status, headers, config) {
                self.employees = data;
                console.log("loaded employees...");
            }).error(function(data, status, headers, config) {
            errorService.handle(data, status, headers, config);
        });
    };

    this.loadEverything = function() {
        this.loadJobTitles(this);
        this.loadLocations(this);
        this.loadLobs(this);
        this.loadSkillSet(this);
        this.loadRatings(this);
        this.loadImportance(this);
        this.loadEmployees(this);
        this.loadMatchStatus(this);
    }

   // this.loadEverything();

}