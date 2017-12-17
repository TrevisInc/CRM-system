(function () {
	'use strict';

	app.controller('StudentEditProfileController', ['$scope', function ($scope) {
		var user =  JSON.parse(localStorage.getItem('user'));
		$scope.user = user;

		$scope.saveData = function() {
			console.log('success');
		}
	}]);
})();