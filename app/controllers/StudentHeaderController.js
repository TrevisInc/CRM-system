(function () {
	'use strict';

	app.controller('StudentHeaderController', ['$scope', 'DataRepository', '$location', function ($scope, DataRepository, $location) {

		var user =  JSON.parse(localStorage.getItem('user'));
		$scope.userName = user.firstname;
		
		$scope.logOut = function() {
			localStorage.clear();
			$location.path('/');
		} 
	}]);
})();