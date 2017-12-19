(function () {
  'use strict';
  
  app.controller('TeacherScheduleController', ['$scope', 'DataRepository', '$uibModal', function ($scope, DataRepository, $uibModal) {
    
    $scope.editLesson = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/modal/editLesson/template.html',
        controller: 'EditLessonController',
        size: 'md'
      });
    };
  
  }]);
})();