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
					$location.path('/student/' + user.id);
				} else if (user.role_id === 2) {
					$location.path('/teacher/' + user.id);
				} else $location.path('/');

				localStorage.setItem('role_id', user.role_id);
				localStorage.setItem('id', user.id);
				localStorage.setItem('authToken', user.authToken);

				$scope.logVal = true;
			}, function (error) {
				console.log(error);
				$scope.logVal = false;
			});
		}
		
	}]);
})();