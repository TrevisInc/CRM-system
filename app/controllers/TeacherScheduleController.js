(function () {
  'use strict';
  
  app.controller('TeacherScheduleController', ['$scope', 'DataRepository', 'utils', '$uibModal','moment','calendarConfig', function ($scope, DataRepository, utils, $uibModal, moment, calendarConfig) {

    
    var idTeacher = localStorage.getItem('id');
    var rooms = [];
    var groups = [];
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    $scope.events = [];
    $scope.cellIsOpen = true;
    
  
    // Получаем список аудиторий
    DataRepository.getRooms().then(function (response) {
      rooms = response.data;
  
      // Получаем список групп преподавателя
      DataRepository.getGroupsByTeacher(idTeacher).then(function (response) {
        groups = response.data;
  
        // Формирование массива событий
        DataRepository.getScheduleTeacher(idTeacher).then(function (response) {
          response.data.forEach(function (item) {
      
            var groupTitle, roomTitle;
      
            // Определяем название группы
            for (var i = 0; i < groups.length; i++) {
              if (item.group_id === groups[i].id) {
                groupTitle = groups[i].title;
              }
            }
      
            // Определяем название аудитории
            for (var i = 0; i < rooms.length; i++) {
              if (item.group_id === rooms[i].id) {
                roomTitle = rooms[i].title;
              }
            }

            $scope.events.push({
              theme: item.theme,
              title: 'Группа: ' + groupTitle + '; Аудитория: ' + roomTitle + '; Тема: ' + (item.theme || '<i>empty</i>'),
              color: calendarConfig.colorTypes.info,
              startsAt: new Date(item.date),
              endsAt: new Date(new Date(item.date).setHours(new Date(item.date).getHours() + 3)),
              draggable: true,
              resizable: true,
              actions: actions,
              idLesson: item.id,
              setNewTheme: function (data) {
                var d = this.title.split(' ');
                d[d.length-1] = data;
                this.title = d.join(' ');
              }
            });
          });
    
        }, function (error) {
          utils.notify({
            message: 'Сервер с данными сейчас недоступен, попробуйте позже',
            type: 'danger'
          });
        });
      }, function (error) {
        utils.notify({
          message: 'При загрузке данных, связь с сервером установить не удалось, попробуйте позже',
          type: 'danger'
        });
      });
      
    }, function (error) {
      utils.notify({
        message: 'При загрузке данных, связь с сервером установить не удалось, попробуйте позже',
        type: 'danger'
      });
    });
    
    
    
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function (args) {
        sessionStorage.setItem('id_lesson', args.calendarEvent.idLesson);
        
        var modalInstance = $uibModal.open({
          templateUrl: 'app/modal/editLesson/template.html',
          controller: 'EditLessonController',
          size: 'md'
        });

        modalInstance.result.then(function (data) {

          DataRepository.putScheduleData(args.calendarEvent.idLesson, data).then(function (response) {
            utils.notify({
              message: 'Тема урока успешно сохранена',
              type: 'success'
            });
            
            $scope.events.forEach(function (item) {
              if(data.id === item.idLesson) {
                item.theme = data.theme;
                item.setNewTheme(item.theme)
              }
            });
            
          }, function (error) {
            utils.notify({
              message: 'Тему урока сохранить не удалось, повторите попытку чуть позже',
              type: 'danger'
            });
          });
        }, function (error) {
        });
      }
    }];
    
    
  
    
    // Изменение формата вывода времени во вкладке День
    var originalFormat = calendarConfig.dateFormats.hour;
    calendarConfig.dateFormats.hour = 'HH:mm';
  
    $scope.$on('$destroy', function() {
      calendarConfig.dateFormats.hour = originalFormat; // reset for other demos
    });
    
    
    
    
    $scope.timespanClicked = function (date, cell) {
      
      if ($scope.calendarView === 'month') {
        if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          $scope.cellIsOpen = false;
        } else {
          $scope.cellIsOpen = true;
          $scope.viewDate = date;
        }
      } else if ($scope.calendarView === 'year') {
        if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
          $scope.cellIsOpen = false;
        } else {
          $scope.cellIsOpen = true;
          $scope.viewDate = date;
        }
      }
    };
    
  }]);
})();