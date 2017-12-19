(function(){
  
  app.controller('EditLessonController', EditLessonController);
  
  function EditLessonController($scope, $uibModalInstance, DataRepository) {
    $scope.newLesson = {};
    
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.ok = function () {
      $uibModalInstance.close($scope.newBook);
    };
  }
  EditLessonController.$inject = [
    '$scope',
    '$uibModalInstance',
    'DataRepository'
  ];
  
})();