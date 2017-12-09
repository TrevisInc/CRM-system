(function () {
	'use strict';

	app.controller('RegistrationController', ['$scope', 'DataRepository', function ($scope, DataRepository) {

		var registrationModel = {
			firstname: '',
			lastname: '',
			email: '',
			login: '',
			password: '',
			group: ''
		};

		$scope.newUser = angular.extend({}, registrationModel);

		DataRepository.getGroupList().then(function (response) {
			$scope.someGroup = response.data;
		}, function (error) {
			console.log(error);
		});

		$scope.dispatchForm = function() {
			console.log($scope.newUser);
		}

	}]);
})();