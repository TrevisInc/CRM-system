(function () {
	'use strict';

	app.controller('HeaderController', ['$scope', '$location', 'DataRepository', function ($scope, $location, DataRepository) {

		$scope.newLogin = {
			login: '',
			password: ''
		};


		$scope.enterOnSite = function() {
			$location.path('/student');
			// сдесь нужно добавить код проверки статуса, который придет при логине.
		}
		
	}]);
})();