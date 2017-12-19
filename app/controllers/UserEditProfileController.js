(function () {
	'use strict';

	app.controller('UserEditProfileController', ['$scope', function ($scope) {
		
		var user =  JSON.parse(localStorage.getItem('user'));
		$scope.user = user;
		$scope.role = user.role_id;

	}]);
})();