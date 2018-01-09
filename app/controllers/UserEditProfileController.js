(function () {
	'use strict';

	app.controller('UserEditProfileController', ['$scope',  'DataRepository', 'utils', function ($scope, DataRepository, utils) {
		
		$scope.role = localStorage.getItem('role_id');
		$scope.userId = localStorage.getItem('id');
		$scope.passwordShow = false;
		$scope.gitShow = false;
		$scope.testRole = false;
		$scope.editPassword = false;
		$scope.hasErrorStatus = false;
		$scope.showPicture = false;

		$scope.newMaterial = null;
	var server = 'http://crmsys.filonitta.fe.a-level.com.ua';

		$scope.newPass = {
			new: null,
			confirm: null
		}

		var editProfileModel = {
			id: +$scope.userId
		};
		$scope.newData = angular.extend({}, editProfileModel);

		if ($scope.role == 1) {
			$scope.testRole = true;
			DataRepository.getStudentData($scope.userId).then(function(response) {
				$scope.user = response.data;
				if ($scope.user.git !== '') {
					$scope.gitShow = true;
				}
			}, function (error) {
				console.log(error);
			});
		} else if ($scope.role == 2) {
			DataRepository.getTeacherData($scope.userId).then(function(response) {
				$scope.user = response.data
			}, function (error) {
				console.log(error);
			});
		}

		function edit(someData) {
			if ($scope.role == 1) {
				DataRepository.updateStudent($scope.userId, someData).then(function(response) {
					utils.notify({
						message: 'Изменение успешно.',
						type: 'success'
					});
				}, function (error) {
					utils.notify({
						message: 'Что-то пошло не так, попробуйте позже',
						type: 'danger'
					});
				});
			} else if ($scope.role == 2) {
				DataRepository.updateTeacher($scope.userId, someData).then(function(response) {
					utils.notify({
						message: 'Изменение успешно.',
						type: 'success'
					});
				}, function (error) {
					utils.notify({
						message: 'Что-то пошло не так, попробуйте позже',
						type: 'danger'
					});
				});
			}
		}

		$scope.checkFirstName = function(data) {
			$scope.newData.firstname = data;
			edit($scope.newData);
		}

		$scope.checkLastName = function(data) {
			$scope.newData.lastname = data;
			edit($scope.newData);
		}


		$scope.checkEmail = function(data) {
			$scope.newData.email = data;
			edit($scope.newData);
		}

		$scope.checkPassword = function(data) {
			console.log(data);
		}

		$scope.showPassword = function() {
			$scope.passwordShow = !$scope.passwordShow;
		}

		$scope.changePassword = function() {
			$scope.editPassword = !$scope.editPassword;
		}

		$scope.confirmPassword = function() {
			console.log($scope.newPass)
			if ($scope.newPass.new === $scope.newPass.confirm) {
				$scope.newData.password = $scope.newPass.new;
				edit($scope.newData);
				$scope.editPassword = !$scope.editPassword;
				$scope.passwordShow = !$scope.passwordShow;
			} else {
				$scope.hasErrorStatus = !$scope.hasErrorStatus;
				utils.notify({
						message: 'Пароли не совпадают !',
						type: 'danger'
					});
			}

			$scope.newPass.new = null;
			$scope.newPass.confirm = null;
		}

		$scope.canselEdit = function() {
			$scope.editPassword = !$scope.editPassword;
			$scope.passwordShow = !$scope.passwordShow;
		}

		$scope.checkGit = function(data) {
			$scope.newData.git = data;
			$scope.gitShow = !$scope.gitShow;
			edit($scope.newData);
		}
		
		$scope.updateImage = function() {

			var formData = new FormData();
			formData.append("image", $scope.newMaterial);

			DataRepository.setImage(formData).then(function(response) {

				$scope.newData.image = server + response.data.image;
				$scope.user.image = $scope.newData.image; // Для того, чтобы сразу обновилась картинка
				edit($scope.newData);
			}, function (error) {
				console.log(error);

				if(error.data.message === 'No file data') {
					utils.notify({
						message: 'Картинка не выбрана',
						type: 'danger'
					});
				} else {
				  	utils.notify({
						message: 'Выбрать картинку не удалось, повторите попытку позже',
						type: 'danger'
				  	});
				}
			});
			$scope.showPicture = !$scope.showPicture;
		}

		$scope.changeImage = function() {
			$scope.showPicture = !$scope.showPicture;
		}
		
	}]);
})();