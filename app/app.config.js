app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');

	$routeProvider
		.when('/', {
			templateUrl: 'app/views/home.template.html',
			controller: 'HomeController'
		})
		.when('/reg', {
			templateUrl: 'app/views/registration.template.html',
			controller: 'RegistrationController'
		})
		.when('/student/:studentId', {
			templateUrl: 'app/views/student.home.template.html',
			controller: 'StudentHomeController'
		})
		.when('/student/:studentId/editProfile', {
			templateUrl: 'app/views/student.edit.profile.template.html',
			controller: 'StudentEditProfileController'
		})
		.when('/student/:studentId/group/:groupId',{
    		templateUrl: 'app/views/student.group.template.html',
    		controller: 'StudentGroupController'
    	})
    	.when('/student/:studentId/homework/:homeworkId',{
    		templateUrl: 'app/views/student.homework.template.html',
    		controller: 'StudentHomeworkController'
    	})
		.otherwise('/');
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');
}]);