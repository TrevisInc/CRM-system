(function () {
	'use strict';

	app.controller('HeaderController', ['$scope', '$location', 'DataRepository', '$http', function ($scope, $location, DataRepository, $http) {

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
					$location.path('/student');
				} else $location.path('/');

				var userJson = JSON.stringify(user);  
				localStorage.setItem('user', userJson);
				localStorage.setItem('authToken', user.authToken);

				$scope.logVal = true;
			}, function (error) {
				console.log(error);
				$scope.logVal = false;
			});
		}
		
	}]);
})();