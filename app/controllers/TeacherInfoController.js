(function () {
  'use strict';
  
  app.controller('TeacherInfoController', ['$scope', 'DataRepository', 'utils', '$uibModal', function ($scope, DataRepository, utils, $uibModal) {
  
    var idTeacher = localStorage.getItem('id');
    var server = 'http://crmsys.filonitta.fe.a-level.com.ua';
    $scope.info = [
      {
        id: 5,
        title: 'Rdsgsdg',
        link: 'fadgsdg',
      },
      {
        id: 6,
        title: 'ahfhfdh',
        link: 'fadgs4663274dg',
      },
      {
        id: 7,
        title: 'Rdsdagfdhoi;oigsdg',
        link: 'fadg1212141sdg',
      },
      {
        id: 8,
        title: 'Rdaaaaaaasgsdg',
        link: '1321gdffadgsdg',
      },
      {
        id: 9,
        title: 'sdaghsgsdg',
        link: 'fadgsd1241515g',
      }
    ];
    
    
    //Получения массива информации всех групп в которых преподает
    // DataRepository.getGroupsByTeacher(idTeacher).then(function (response) {
    //   var groups = response.data;
    //
    //   groups.forEach(function (item) {
    //
    //     DataRepository.getInfoByGroup(item.id).then(function (response) {
    //       response.data.forEach(function (item) {
    //         item.link = server + item.link;
    //         $scope.info.push(item);
    //       });
    //       console.log($scope.info);
    //     }, function (error) {
    //       utils.notify({
    //         message: 'При загрузке материалов произошла ошибка, обновите страницу',
    //         type: 'danger'
    //       });
    //     });
    //   });
    // }, function (error) {
    //   utils.notify({
    //     message: 'При загрузке групп преподавателя произошла ошибка, обновите страницу',
    //     type: 'danger'
    //   });
    // });
    
    //Удаление материала
    $scope.deleteMaterial = function (materialId) {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/modal/confirm/template.html',
        controller: 'ConfirmController',
        size: 'sm'
      });
    
      modalInstance.result.then(function (result) {
        if (!result) return;

        DataRepository.deleteInfo(materialId).then(function (response) {

          var doomed = $scope.info.filter(function (material) { return material.id === materialId})[0],
            index = $scope.info.indexOf(doomed);

          $scope.info.splice(index, 1);

          utils.notify({
            message: 'Материал успешно удален',
            type: 'success'
          });
        }, function (error) {
          utils.notify({
            message: 'При удалении материала, произошла ошибка, повторите ваш запрос позже',
            type: 'danger'
          });
        });

      }, function (error) {});
    };
    
    
    
    
  }]);
})();