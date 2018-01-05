(function () {
	'use strict';

	app.controller('RegistrationController', ['$scope', 'DataRepository', 'utils', function ($scope, DataRepository, utils) {

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
					utils.notify({
						message: 'Сотрудник, ' + $scope.newUser.firstname + ' успешно зарегистрирован!',
						type: 'success'
					});
				}, function (error) {
					var errorMessage = '';
					
					if (error.status === 422) {
						if (error.data.error[0].field === 'password') {
							errorMessage = '"Пароль", - содержит минимум 6 символов';
						} else if (error.data.error[0].field === 'firstname') {
							errorMessage = '"Имя", - содержит от 3 до 15 символов';
						} else if (error.data.error[0].field === 'lastname') {
							errorMessage = '"Фамилия", - содержит от 3 до 15 символов';
						} else if (error.data.error[0].field === 'login') {
							errorMessage = '"Логин", - содержит от 5 до 15 символов';
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
					utils.notify({
						message: 'Студент, ' + $scope.newUser.firstname + ' успешно зарегистрирован!',
						type: 'success'
					});
				}, function (error) {
					var errorMessage = '';
					
					if (error.status === 422) {
						if (error.data.error[0].field === 'password') {
							errorMessage = '"Пароль", - содержит минимум 6 символов';
						} else if (error.data.error[0].field === 'firstname') {
							errorMessage = '"Имя", - содержит от 3 до 15 символов';
						} else if (error.data.error[0].field === 'lastname') {
							errorMessage = '"Фамилия", - содержит от 3 до 15 символов';
						} else if (error.data.error[0].field === 'login') {
							errorMessage = '"Логин", - содержит от 5 до 15 символов';
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
		}
	}]);
})();