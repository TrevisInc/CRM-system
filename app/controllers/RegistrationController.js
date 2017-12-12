(function () {
	'use strict';

	app.controller('RegistrationController', ['$scope', 'DataRepository', function ($scope, DataRepository) {

		var registrationModel = {
			firstname: '',
			lastname: '',
			email: '',
			login: '',
			password: '',
			group: null
		};


		$scope.newUser = angular.extend({}, registrationModel);

		DataRepository.getGroupList().then(function (response) {
			
			$scope.someGroup = response.data;
			console.log($scope.someGroup)
		}, function (error) {
			console.log(error);
		});

		$scope.dispatchForm = function() {
			console.log($scope.newUser);
		}

	}]);
})();