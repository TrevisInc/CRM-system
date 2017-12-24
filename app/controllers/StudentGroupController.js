(function () {
  'use strict';
  
  app.controller('StudentGroupController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
    var groupId = localStorage.getItem('groupId');

    DataRepository.getGroup(groupId).then( function (response) {
      
      $scope.groupByStudent = response.data;
      
        DataRepository.getStudentsByGroup(groupId).then(function (response) {
          $scope.studentsByGroup = response.data;
        }, function (error) {});
        
    }, function (error) {});
  }]);
})();