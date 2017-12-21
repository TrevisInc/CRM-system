(function () {
	'use strict';

	app.controller('UserEditProfileController', ['$scope',  'DataRepository', function ($scope, DataRepository) {
		
		$scope.role = localStorage.getItem('role_id');
		$scope.userId = localStorage.getItem('id');
		
		if ($scope.role == 1) {
			DataRepository.getStudentData($scope.userId).then(function(response) {
				$scope.user = response.data;
			}, function (error) {
				console.log(error);
			});
		} else if ($scope.role == 2) {
			DataRepository.getTeacherData($scope.userId).then(function(response) {
				$scope.user = response.data
			}, function (error) {
				console.log(error);
			});
		}

	}]);
})();