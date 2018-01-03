(function () {
	'use strict';

	app.controller('TeacherMenuController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		
		$scope.user = localStorage.getItem('id');

		DataRepository.getGroupsByTeacher($scope.user).then(function (response) {
			$scope.groupsByTeacher = response.data;
		}, function (error) {
			console.log(error);
		});

		$scope.setGroupId = function (id) {
	      	sessionStorage.setItem('groupId', id);
	    };
	}]);
})();