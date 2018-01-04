(function () {
  'use strict';
  
  app.controller('StudentScheduleController', ['$scope', 'DataRepository','utils', function ($scope, DataRepository, utils) {
    var groupId = sessionStorage.getItem('groupId');
    var rooms = [];
    
    
    DataRepository.getGroup(groupId).then(function (response) {
      $scope.group = response.data;
    }, function (error) {
      utils.notify({
        message: 'При загрузке данных, связь с сервером установить не удалось, попробуйте позже',
        type: 'danger'
      });
    });
    
    // Получаем список аудиторий
    DataRepository.getRooms().then(function (response) {
      rooms = response.data;
    }, function (error) {
      utils.notify({
        message: 'При загрузке данных, связь с сервером установить не удалось, попробуйте позже',
        type: 'danger'
      });
    });
    
    $scope.currentPage = 1;
    var count = 9;
    
    DataRepository.getScheduleData(groupId).then(function (response) {
      var allSchedule = response.data;
      $scope.totalItems = Object.keys(allSchedule).length + count; // Определение макс кол-ва занятий,для вычисления maxSize страниц
      $scope.maxSize = Math.ceil($scope.totalItems / count);
      
      // Определение границы между прошлыми и будущими занятиями
      for( var i = 1; i < allSchedule.length; i++) {
        var now = new Date();
        var lessonDate = new Date(allSchedule[i].date);
        if(lessonDate > now) {
          $scope.currentPage = Math.ceil(i / count);
          break;
        }
      }
      
      // Получение расписания по определенной странице
      DataRepository.getScheduleDataPage(groupId, $scope.currentPage, count).then(function (response) {
        $scope.schedule = response.data;
        $scope.schedule.forEach(function (item) {
          item.room_id = rooms.filter(function (m) {
            return m.id === item.room_id;
          })[0].title;
        });
      }, function (error) {
        utils.notify({
          message: 'Сервер с данными сейчас недоступен, попробуйте позже',
          type: 'danger'
        });
      });
    }, function (error) {
      utils.notify({
        message: 'Сервер с данными сейчас недоступен, попробуйте позже',
        type: 'danger'
      });
    });
  
    $scope.pageChanged = function() {
      DataRepository.getScheduleDataPage(groupId, $scope.currentPage, count).then(function (response) {
        $scope.schedule = response.data;
        $scope.schedule.forEach(function (item) {
          item.room_id = rooms.filter(function (m) {
            return m.id === item.room_id;
          })[0].title;
        });
      }, function (error) {
        utils.notify({
          message: 'Сервер с данными сейчас недоступен, попробуйте позже',
          type: 'danger'
        });
      });
    };
    
    $scope.controlDate = function (date) {
      var now = new Date();
      var lessonDate = new Date(date);
      
      if(lessonDate > now) {
        console.log('true');
        return true;
      } else {
        console.log('false');
        return false;
      }
    }
  }]);
})();