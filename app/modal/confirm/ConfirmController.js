(function(){

app.controller('ConfirmController', confirmController);

function confirmController($scope, $uibModalInstance) {
  $scope.cancel = function () {
    $uibModalInstance.close(false);
  };
  
  $scope.ok = function () {
    $uibModalInstance.close(true);
  };
}
confirmController.$inject = [
  '$scope',
  '$uibModalInstance'
];

})();