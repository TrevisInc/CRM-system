(function () {
	'use strict';

	app.controller('StudentMenuController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		
		$scope.student = localStorage.getItem('id');
		DataRepository.getGroupsByStudent($scope.student).then(function (response) {
			$scope.groupsByStudent = response.data;
    }, function (error) {});
		
		$scope.setGroupId = function (id) {
      	localStorage.setItem('groupId', id);
    };
		
	}]);
})();