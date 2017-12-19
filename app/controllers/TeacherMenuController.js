(function () {
	'use strict';

	app.controller('TeacherMenuController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		$scope.user =  JSON.parse(localStorage.getItem('user'));

		DataRepository.getGroupsByTeacher($scope.user.id).then(function (response) {
			$scope.groupsByTeacher = response.data;
		}, function (error) {
			console.log(error);
		});
	}]);
})();