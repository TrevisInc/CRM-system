(function () {
	'use strict';

	app.controller('StudentMenuController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		
		$scope.studentId = localStorage.getItem('id');
		
		DataRepository.getGroupsByStudent($scope.studentId).then(function (response) {
			$scope.groupsByStudent = response.data;
    }, function (error) {});
		
		$scope.setGroupId = function (id) {
      localStorage.setItem('groupId', id);
    };
		
	}]);
})();