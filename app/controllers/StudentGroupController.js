(function () {
  'use strict';
  
  app.controller('StudentGroupController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
    DataRepository.getData().then(function (response) {
      $scope.data = response.data;
      console.log($scope.data);
    }, function (error) {});
  }]);
})();