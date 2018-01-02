(function(){
  
  app.controller('EditLessonController', EditLessonController);
  
  function EditLessonController($scope, $uibModalInstance, DataRepository, utils) {
    var lessonId = sessionStorage.getItem('id_lesson');
    
    DataRepository.getScheduleTeacher(localStorage.getItem('id')).then(function (response) {
      response.data.forEach(function (item) {
        if(item.id == lessonId) {
          $scope.lesson = item;
        }
      });
    }, function (error) {
      utils.notify({
        message: 'Произошла ошибка загрузки занятия, повторите ваш запрос позже',
        type: 'danger'
      });
    });
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.ok = function () {
      sessionStorage.clear();
      $uibModalInstance.close($scope.lesson);
    };
  }
  EditLessonController.$inject = [
    '$scope',
    '$uibModalInstance',
    'DataRepository',
    'utils'
  ];
  
})();