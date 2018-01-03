(function () {
	'use strict';

	app.controller('TeacherJournalController', ['$scope', 'DataRepository', '$filter', function ($scope, DataRepository, $filter) {
		
		var groupId = sessionStorage.getItem('groupId');
		console.log(groupId)
		var someModel = {
			student_id: null,
			date_id: null,
			status: null
		}

		$scope.dt = null;
		$scope.format = 'dd-MMMM-yyyy';

		$scope.popup = {
			opened: false
		};

		$scope.open = function() {
			$scope.popup.opened = true;
		};

		$scope.showtable = function() {
			console.log($scope.dt)

			DataRepository.getJournalGroup(groupId).then(function(response) {
				// $scope.someArr = response.data;
				// console.log($scope.someArr)
				// var ressss = $filter('date')(response.data[24].date, 'dd-MMMM-yyyy');
				// console.log(ressss);

				$scope.someArr = response.data.filter(function(item){
					console.log($filter('date')(item.date, 'dd-MM-yyyy') === $filter('date')($scope.dt, 'dd-MM-yyyy'));
					// console.log($filter('date')($scope.dt, 'dd-MM-yyyy'));
					return $filter('date')(item.date, 'dd-MM-yyyy') === $filter('date')($scope.dt, 'dd-MMMM-yyyy');
				})[0];
				console.log('arr', $scope.someArr)
			}, function (error) {
				console.log(error);
			});
		}
				
	}]);
})();