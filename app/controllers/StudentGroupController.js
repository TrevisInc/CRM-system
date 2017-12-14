(function () {
  'use strict';
  
  app.controller('StudentGroupController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
    DataRepository.getStudents().then(function (response) {
      $scope.students = response.data;
      console.log($scope.students);
    }, function (error) {});
  }]);
})();