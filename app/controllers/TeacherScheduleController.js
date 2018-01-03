(function () {
  'use strict';
  
  app.controller('TeacherScheduleController', ['$scope', 'DataRepository', 'utils', '$uibModal', 'calendarConfig', function ($scope, DataRepository, utils, $uibModal, calendarConfig) {
    
    var idTeacher = localStorage.getItem('id');
    
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    
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
    
    $scope.events = [];
    
    DataRepository.getScheduleTeacher(idTeacher).then(function (response) {
      response.data.forEach(function (item) {
        $scope.events.push({
          title: 'Группа: ' + item.group_id + ' Тема: ' + item.theme,
          color: calendarConfig.colorTypes.info,
          startsAt: new Date(item.date.substr(0, 10) + ' ' + item.time),
          endsAt: new Date(item.date.substr(0, 10) + ' 22:00:00'),
          draggable: true,
          resizable: true,
          actions: actions,
          idLesson: item.id
        });
      });
    }, function (error) {
      utils.notify({
        message: 'Сервер с данными сейчас недоступен, попробуйте позже',
        type: 'danger'
      });
    });
    
    $scope.cellIsOpen = true;
    
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