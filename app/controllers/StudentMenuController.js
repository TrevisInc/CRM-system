(function () {
	'use strict';

	app.controller('StudentMenuController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		
		$scope.student = JSON.parse(localStorage.getItem('user'));
		
		DataRepository.getGroupsByStudent($scope.student.id).then(function (response) {
			$scope.groupsByStudent = response.data;
    }, function (error) {});
		
		$scope.setGroupId = function (id) {
      localStorage.setItem('groupId', id);
    };
		
	}]);
})();