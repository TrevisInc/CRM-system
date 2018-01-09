(function () {
	'use strict';

	app.controller('RegistrationController', ['$scope', 'DataRepository', 'utils', '$location', function ($scope, DataRepository, utils, $location) {

		var registrationModel = {
			firstname: '',
			lastname: '',
			email: '',
			login: '',
			password: '',
			group_id: null
		};
		$scope.newUser = angular.extend({}, registrationModel);
		$scope.testOnTeacher = false;
		$scope.checkPassword = true;
		$scope.checkFirstName = true;
		$scope.checkLastName = true;
		$scope.checkLogin = true;

		$scope.testOnTeacherClick = function() {
			$scope.testOnTeacher = !$scope.testOnTeacher;
		}

		DataRepository.getGroupList().then(function (response) {
			$scope.someGroup = response.data;
		}, function (error) {
			console.log(error);
		});

		$scope.dispatchForm = function() {
			if ($scope.testOnTeacher === true) {
				delete $scope.newUser.group_id;
				DataRepository.setTeacher($scope.newUser).then(function (response) {
					$location.path('/');
					utils.notify({
						message: 'Сотрудник, ' + $scope.newUser.firstname + ' успешно зарегистрирован, можете выполнить вход в систему.',
						type: 'success'
					});
				}, function (error) {
					console.log(error.data)
					var errorMessage = '';
					
					if (error.status === 422) {
						if (error.data.error[0].field === 'password') {
							errorMessage = '"Пароль", - содержит минимум 6 символов';
							$scope.checkPassword = false;
						} else if (error.data.error[0].field === 'firstname') {
							errorMessage = '"Имя", - содержит от 3 до 15 символов';
							$scope.checkFirstName = false;
						} else if (error.data.error[0].field === 'lastname') {
							errorMessage = '"Фамилия", - содержит от 3 до 15 символов';
							$scope.checkLastName = false;
						} else if (error.data.error[0].field === 'login') {
							errorMessage = '"Логин", - содержит от 5 до 15 символов';
							$scope.checkLogin = false;
						} 
						utils.notify({
							message: 'Некорректно заполненное поле ' + errorMessage,
							type: 'danger'
						});
					} else {
						utils.notify({
							message: 'Сервер с данными сейчас недоступен, попробуйте позже',
							type: 'danger'
						});
					}
				});

			} else {
				DataRepository.setStudent($scope.newUser).then(function (response) {
					$location.path('/');
					utils.notify({
						message: 'Студент, ' + $scope.newUser.firstname + ' успешно зарегистрирован, можете выполнить вход в систему.',
						type: 'success'
					});
				}, function (error) {
					var errorMessage = '';
					
					if (error.status === 422) {
						if (error.data.error[0].field === 'password') {
							errorMessage = '"Пароль", - содержит минимум 6 символов';
							$scope.checkPassword = false;
						} else if (error.data.error[0].field === 'firstname') {
							errorMessage = '"Имя", - содержит от 3 до 15 символов';
							$scope.checkFirstName = false;
						} else if (error.data.error[0].field === 'lastname') {
							errorMessage = '"Фамилия", - содержит от 3 до 15 символов';
							$scope.checkLastName = false;
						} else if (error.data.error[0].field === 'login') {
							errorMessage = '"Логин", - содержит от 5 до 15 символов';
							$scope.checkLogin = false;
						} 
						utils.notify({
							message: 'Некорректно заполненное поле ' + errorMessage,
							type: 'danger'
						});
					} else {
						utils.notify({
							message: 'Сервер с данными сейчас недоступен, попробуйте позже',
							type: 'danger'
						});
					}
				});
			}
			$scope.testOnTeacher = false;
			$scope.checkPassword = true;
			$scope.checkFirstName = true;
			$scope.checkLastName = true;
			$scope.checkLogin = true;
		}
	}]);
})();