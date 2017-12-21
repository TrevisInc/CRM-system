(function () {
	'use strict';

	app.controller('NewsController', ['$scope', 'DataRepository', function ($scope, DataRepository) {
		
		$scope.currentPage = 1;
		$scope.totalItems = 500;
		$scope.maxSize = 3;

		DataRepository.getNews($scope.currentPage).then(function (response) {
			$scope.someNews = response.data;
		}, function (error) {
			console.log(error);
		});

		$scope.pageChanged = function() {
    		DataRepository.getNews($scope.currentPage).then(function (response) {
    			$scope.someNews = response.data;
		}, function (error) {
			console.log(error);
		});
		};
	}]);
})();