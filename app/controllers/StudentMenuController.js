(function () {
	'use strict';

	app.controller('StudentMenuController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		
		DataRepository.getUser().then(function (response) {	
			$scope.userGroup = response.data.group;
		}, function (error) {
			console.log(error);
		});

	}]);
})();