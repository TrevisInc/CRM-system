(function () {
  'use strict';
  
  app.controller('StudentInfoController', ['$scope', 'DataRepository', 'utils', function ($scope, DataRepository, utils) {
    
    var userId = localStorage.getItem('id');
    var server = 'http://crmsys.filonitta.fe.a-level.com.ua';
    $scope.info = [];
    
    //Получения массива информации всех групп в которых учится студент
    DataRepository.getGroupsByStudent(userId).then(function (response) {
      var groups = response.data;
    
      groups.forEach(function (item) {
      
        DataRepository.getInfoByGroup(item.id).then(function (response) {
          response.data.forEach(function (item) {
            item.link = server + item.link;
  
            var arr = item.link.split('.');
  
            if (arr[arr.length-1] === 'pdf') {
              item.show = true;
            } else {
              item.show = false;
            }
            
            
            $scope.info.push(item);
          });
          console.log($scope.info);
        }, function (error) {
          utils.notify({
            message: 'При загрузке материалов произошла ошибка, обновите страницу',
            type: 'danger'
          });
        });
      });
    }, function (error) {
      utils.notify({
        message: 'При загрузке групп преподавателя произошла ошибка, обновите страницу',
        type: 'danger'
      });
    });
  
  
  }]);
})();