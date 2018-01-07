(function(){
  
  app.controller('AddMaterialController', addMaterialController);
  
  function addMaterialController($scope, $uibModalInstance, DataRepository, utils) {
    var idTeacher = localStorage.getItem('id');
    
    $scope.newMaterial = {
      title: '',
      file: null
    };
    $scope.group_id = null;
    
    DataRepository.getGroupsByTeacher(idTeacher).then(function (response) {
      $scope.groups = response.data;
    }, function (error) {
      utils.notify({
        message: 'При загрузке списка групп произошла ошибка, попробуйте позже',
        type: 'danger'
      });
    });
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.ok = function () {
      
      var formData = new FormData();
      formData.append("title", $scope.newMaterial.title);
      formData.append("file", $scope.newMaterial.file);
      
      sessionStorage.setItem('id_group', $scope.group_id);
      $uibModalInstance.close(formData);
    };
  }
  addMaterialController.$inject = [
    '$scope',
    '$uibModalInstance',
    'DataRepository',
    'utils'
  ];
  
})();