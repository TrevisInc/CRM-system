(function () {
	'use strict';

	app.controller('StudentHeaderController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		
		DataRepository.getUser().then(function (response) {	
			$scope.userName = response.data;
			console.log(response.data)
		}, function (error) {
			console.log(error);
		});
	}]);
})();