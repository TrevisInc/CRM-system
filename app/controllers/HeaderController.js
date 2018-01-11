(function () {
	'use strict';

	app.controller('HeaderController', ['$scope', '$location', 'DataRepository', '$http', 'utils', function ($scope, $location, DataRepository, $http, utils) {

		$scope.newLogin = {
			login: '',
			password: ''
		};

		$scope.logVal = true;

		$scope.enterOnSite = function() {
			DataRepository.getUser($scope.newLogin).then(function(response) {
				var user = response.data;
				$http.defaults.headers.common.Authorization = 'Bearer ' + response.data.authToken;
				
				if (user.role_id === 1) {
					$location.path('/student/' + user.id);
				} else if (user.role_id === 2) {
					$location.path('/teacher/' + user.id);
				} else $location.path('/');

				localStorage.setItem('role_id', user.role_id);
				localStorage.setItem('id', user.id);
				localStorage.setItem('authToken', user.authToken);
        
        utils.notify({
          message: 'Добро пожаловать, ' + user.firstname + ' !',
          type: 'success'
        });

				$scope.logVal = true;
			}, function (error) {
				console.log(error);
        if(error.status === -1) {
          utils.notify({
            message: 'Сервер с данными сейчас недоступен, попробуйте позже',
            type: 'danger'
          });
        } else if(error.status === 401) {
					
        	if ((error.config.data.login === "" && error.config.data.password === "") || error.config.data.login === undefined || error.config.data.password === undefined) {
            utils.notify({
              message: 'Для входа в систему, авторизируйтесь пожалуйста',
              type: 'danger'
            });
					} else {
            utils.notify({
              message: 'Проверьте, пожалуйста, верность введенных данных и попробуйте войти снова',
              type: 'danger'
            });
					}
        } else if (error.status === 452) {
          utils.notify({
            message: 'Сервер сейчас недоступен, попробуйте позже',
            type: 'danger'
          });
				}
				$scope.logVal = false;
			});
		}
		
	}]);
})();