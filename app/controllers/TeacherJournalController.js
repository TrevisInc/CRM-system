(function () {
	'use strict';

	app.controller('TeacherJournalController', ['$scope', 'DataRepository', '$filter', function ($scope, DataRepository, $filter) {
		
		var groupId = sessionStorage.getItem('groupId');

		DataRepository.getGroup(groupId).then(function(response) {
			$scope.groupName = response.data.title;
		}, function (error) {
			console.log(error);
		});
			
		var someModel = {
			student_id: null,
			date_id: null,
			status: 0
		}

		$scope.newStatus = angular.extend({}, someModel);
		$scope.studentPresentCounter = null;
		$scope.showResult = false;
		$scope.showError = false;
		$scope.disableBtn = false;
		$scope.dt = null;
		$scope.format = 'dd-MMMM-yyyy';
		$scope.popup = {
			opened: false
		};

		$scope.open = function() {
			$scope.popup.opened = true;
			$scope.showError = false;
		};

		$scope.showtable = function() {
			$scope.studentPresentCounter = null;
			$scope.showError = false;
			$scope.disableBtn = false;

			DataRepository.getJournalGroup(groupId).then(function(response) {
				var now = new Date();
				var today = new Date($scope.dt);

				var someArrr = response.data.filter(function(item){
					if ($filter('date')(item.date, 'dd-MM-yyyy') === $filter('date')($scope.dt, 'dd-MM-yyyy')) {
						return item;
					}
				})[0];

				if (someArrr === undefined) {
					$scope.showError = true;
					$scope.showResult = false;
				} else {
					$scope.ArrForPrint = someArrr.students;
					$scope.showResult = true;
					$scope.newStatus.date_id = someArrr.id;

					DataRepository.getJournalById(groupId, someArrr.id).then(function(response) {
						$scope.studentCounter = response.data[0].students.length;

						if (now > today) {
							$scope.disableBtn = true;
							response.data[0].students.forEach(function(item) {
								if (item.status === 1) {
									$scope.studentPresentCounter++;
								}
							})	
						}

					}, function (error) {
						console.log(error);
					});
				}
				
			}, function (error) {
				console.log(error);
			});
		}

		$scope.statusSuccess = function(student) {
			$scope.newStatus.student_id = student.id;
			student.status === 0 ? $scope.newStatus.status = 1 : $scope.newStatus.status = 0;
			student.status = +!student.status;

			DataRepository.putStatusInJournal($scope.newStatus).then(function(response) {

				if (student.status === 1) {
					$scope.studentPresentCounter++;
				} else $scope.studentPresentCounter--;

			}, function (error) {
				console.log(error);
			});
		}
				
	}]);
})();