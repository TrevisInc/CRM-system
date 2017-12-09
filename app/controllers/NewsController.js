(function () {
	'use strict';

	app.controller('NewsController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		DataRepository.getNews().then(function (response) {
			$scope.someNews = response.data;
		}, function (error) {
			console.log(error);
		});
	}]);
})();