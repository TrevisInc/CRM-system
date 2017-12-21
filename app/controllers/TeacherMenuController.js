(function () {
	'use strict';

	app.controller('TeacherMenuController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		
		var user = localStorage.getItem('id');

		DataRepository.getGroupsByTeacher(user).then(function (response) {
			$scope.groupsByTeacher = response.data;
		}, function (error) {
			console.log(error);
		});
	}]);
})();