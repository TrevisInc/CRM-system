(function () {
  'use strict';
  
  app.controller('TeacherInfoController', ['$scope', 'DataRepository', 'utils', '$uibModal', function ($scope, DataRepository, utils, $uibModal) {
  
    var idTeacher = localStorage.getItem('id');
    var server = 'http://crmsys.filonitta.fe.a-level.com.ua';
    $scope.info = [];
    
    function getInfo() {
      //Получения массива информации всех групп в которых преподает
      DataRepository.getGroupsByTeacher(idTeacher).then(function (response) {
        var groups = response.data;
    
        groups.forEach(function (item) {
      
          DataRepository.getInfoByGroup(item.id).then(function (response) {
            response.data.forEach(function (item) {
              item.link = server + item.link;
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
    }
    
    getInfo();
    
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
    
    //Добалвение нового материала
    $scope.addMaterial = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/modal/add-material/template.html',
        controller: 'AddMaterialController',
        size: 'md'
      });
  
      modalInstance.result.then(function (data) {
        var idGroup = sessionStorage.getItem('id_group');
        DataRepository.setInfo(idGroup, data).then(function (result) {
          $scope.info = [];
          getInfo();

          utils.notify({
            message: 'Материал успешно добавлен',
            type: 'success'
          });
          sessionStorage.clear();
        }, function (error) {
          console.log(error);
          utils.notify({
            message: 'Добавление материала не удалось',
            type: 'danger'
          });
        });
      }, function (error) {
      });
    };
    
    // Редактирование материала
    $scope.saveMaterial = function (data, materialId) {
      DataRepository.editInfo(data, materialId).then(function () {
        utils.notify({
          message: 'Тема успешно обновлена',
          type: 'success'
        });
      }, function (error) {
        utils.notify({
          message: 'Обновить тему не удалось, попробуйте позже',
          type: 'danger'
        });
      });
    };
  
    $scope.readModal = function (src) {
      console.log('ld');
      var link = src.split('.');
      if(link[link.length - 1] === 'pdf') {
        window.open(src);
      }
    };
    
    
  }]);
})();