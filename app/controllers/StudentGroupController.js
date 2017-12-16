(function () {
  'use strict';
  
  app.controller('StudentGroupController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
    localStorage.setItem('id-group', 2); // имитация id группы
    
    DataRepository.getGroupsByStudent(localStorage.getItem('id')).then( function (response) {
      $scope.groupByStudent = response.data[0];
  
      DataRepository.getStudentsByGroup($scope.groupByStudent.id).then(function (response) {
        console.log(response);
      }, function (error) {});
      
    }, function (error) {});
    
    
    
  }]);
})();