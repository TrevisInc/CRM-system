(function () {
  'use strict';
  
  app.controller('StudentInfoController', ['$scope', 'DataRepository', 'utils', '$uibModal', function ($scope, DataRepository, utils, $uibModal) {
    
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
            var link = item.link.split('.');
            if(link[link.length - 1] === 'doc') {
              item.hide = true;
            }
            $scope.info.push(item);
          });
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
  
    $scope.readModal = function (src) {
      console.log('ld');
      var link = src.split('.');
      if(link[link.length - 1] === 'pdf') {
        window.open(src);
      }
    };
    
  }]);
})();