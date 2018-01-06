(function () {
	'use strict';

	app.controller('StudentHeaderController', ['$scope', 'DataRepository', '$location', function ($scope, DataRepository, $location) {

		$scope.role = localStorage.getItem('role_id');
		$scope.userId = localStorage.getItem('id');

		if ($scope.role == 1) {
			DataRepository.getStudentData($scope.userId).then(function(response) {
				$scope.userName = response.data.firstname;
				$scope.userImage = response.data.image;
			}, function (error) {
				console.log(error);
			});
		} else if ($scope.role == 2) {
			DataRepository.getTeacherData($scope.userId).then(function(response) {
				$scope.userName = response.data.firstname;
				$scope.userImage = response.data.image;
			}, function (error) {
				console.log(error);
			});
		}
		
		$scope.logOut = function() {
			localStorage.clear();
			$location.path('/');
		} 
	}]);
})();