(function () {
  'use strict';
  
  app.controller('StudentGroupController', ['$scope', 'DataRepository', 'utils', function ($scope, DataRepository, utils) {
    var groupId = sessionStorage.getItem('groupId');

    DataRepository.getGroup(groupId).then( function (response) {
      
      $scope.groupByStudent = response.data;
      
        DataRepository.getStudentsByGroup(groupId).then(function (response) {
          $scope.studentsByGroup = response.data;
        }, function (error) {
          if(error.status === 404) {
            utils.notify({
              message: 'Сервер с данными сейчас недоступен, попробуйте позже',
              type: 'danger'
            });
          }
        });
        
    }, function (error) {});
  
  
    $scope.controlUser = function (id) {
      var user = +localStorage.getItem('id');
      if(id === user) {
        console.log('true');
        return true;
      } else {
        console.log('false');
        return false;
      }
    }
  }]);
})();