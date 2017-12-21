(function () {
	'use strict';

	app.controller('RegistrationController', ['$scope', 'DataRepository', function ($scope, DataRepository) {

		var registrationModel = {
			firstname: '',
			lastname: '',
			email: '',
			login: '',
			password: '',
			group_id: null
		};


		$scope.newUser = angular.extend({}, registrationModel);

		DataRepository.getGroupList().then(function (response) {
			$scope.someGroup = response.data;
		}, function (error) {
			console.log(error);
		});

		$scope.dispatchForm = function() {
			console.log($scope.newUser);
			DataRepository.setStudent($scope.newUser).then(function (response) {
			}, function (error) {
			console.log(error.data);
			});
		}

	}]);
})();