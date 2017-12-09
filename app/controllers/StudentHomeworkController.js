(function () {
  'use strict';
  
  app.controller('StudentHomeworkController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
    $scope.homeworksDone = [];
    $scope.homeworksToDo = [];
    
    DataRepository.getData().then(function (response) {
      
      response.data.homeworks.forEach(function(item) {
        if (item.checked) {
          $scope.homeworksDone.push(item);
        } else {
          $scope.homeworksToDo.push(item);
        }
      });
      // console.log($scope.homeworksDone);
      // console.log($scope.homeworksToDo);
    }, function (error) {});
    
    $scope.sendHomework = function () {
      console.log('отправил ссылку');
    }
  }]);
})();