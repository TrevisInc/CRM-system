(function () {
  'use strict';
  
  app.controller('TeacherScheduleController', ['$scope', 'DataRepository', '$uibModal', function ($scope, DataRepository, $uibModal) {
    // var groupId = localStorage.getItem('groupId');
  
    $scope.currentPage = 0;
    $scope.totalItems = 500;
    $scope.maxSize = 4;
  
    DataRepository.getScheduleData(1).then(function (response) {
      var allSchedule = response.data;
      for( var i = 0; i < allSchedule.length; i++) {
        var now = new Date();
        var lessonDate = new Date(allSchedule[i].date);
        if(lessonDate > now) {
          $scope.currentPage = Math.ceil(i / 9);
          break;
        }
      }
      DataRepository.getScheduleDataPage(1, $scope.currentPage).then(function (response) {
        $scope.schedule = response.data;
      }, function (error) {});
    }, function (error) {});
  
    $scope.pageChanged = function() {
      DataRepository.getScheduleDataPage(1, $scope.currentPage).then(function (response) {
        $scope.schedule = response.data;
      }, function (error) {});
    };
  
    $scope.controlDate = function (date) {
      var now = new Date();
      var lessonDate = new Date(date);
    
      if(lessonDate > now) {
        return true;
      } else {
        return false;
      }
    };
    $scope.editLesson = function (lessonId) {
      sessionStorage.setItem('id_lesson', lessonId);
      
      var modalInstance = $uibModal.open({
        templateUrl: 'app/modal/editLesson/template.html',
        controller: 'EditLessonController',
        size: 'md'
      });
  
      modalInstance.result.then(function (data) {
        
        DataRepository.putScheduleData(lessonId, data).then(function (response) {
          console.log('ok');
        }, function (error) {
          console.log('error', error);
        });
      }, function (error) {});
      
    };
  
  }]);
})();