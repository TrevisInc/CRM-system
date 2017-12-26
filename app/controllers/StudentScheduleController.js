(function () {
  'use strict';
  
  app.controller('StudentScheduleController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
    var groupId = sessionStorage.getItem('groupId');
    
    DataRepository.getGroup(groupId).then(function (response) {
      $scope.group = response.data;
    }, function (error) {});
    
    $scope.currentPage = 1;
    $scope.totalItems = 500;
    $scope.maxSize = 4;
    var count = 9;
    
    DataRepository.getScheduleData(groupId).then(function (response) {
      var allSchedule = response.data;
      for( var i = 1; i < allSchedule.length; i++) {
        var now = new Date();
        var lessonDate = new Date(allSchedule[i].date);
        if(lessonDate > now) {
          $scope.currentPage = Math.ceil(i / 9);
          console.log($scope.currentPage);
          break;
        }
      }
      DataRepository.getScheduleDataPage(groupId, $scope.currentPage, count).then(function (response) {
        $scope.schedule = response.data;
      }, function (error) {});
    }, function (error) {});
  
    $scope.pageChanged = function() {
      DataRepository.getScheduleDataPage(groupId, $scope.currentPage, count).then(function (response) {
        $scope.schedule = response.data;
      }, function (error) {});
    };
    
    $scope.controlDate = function (date) {
      var now = new Date();
      var lessonDate = new Date(date);
      
      if(lessonDate > now) {
        console.log('true');
        return true;
      } else {
        console.log('false');
        return false;
      }
    }
  }]);
})();