(function(){
  
  app.controller('EditLessonController', EditLessonController);
  
  function EditLessonController($scope, $uibModalInstance, DataRepository) {
    var lessonId = sessionStorage.getItem('id_lesson');
    
    DataRepository.getScheduleData(1).then(function (response) {
      response.data.forEach(function (item) {
        if(item.id == lessonId) {
          $scope.lesson = item;
        }
      });
    }, function (error) {
      console.log('Ошибка getScheduleData');
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
    'DataRepository'
  ];
  
})();