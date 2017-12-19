(function () {
	'use strict';

	app.controller('TeacherMenuController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		var user =  JSON.parse(localStorage.getItem('user'));

		DataRepository.getGroupsByTeacher(user.id).then(function (response) {
			$scope.groupsByTeacher = response.data;
		}, function (error) {
			console.log(error);
		});
	}]);
})();