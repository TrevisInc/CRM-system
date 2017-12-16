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
		.when('/student', {
			templateUrl: 'app/views/student.home.template.html',
			controller: 'StudentHomeController'
		})
		.when('/student/group',{
    		templateUrl: 'app/views/student.group.template.html',
    		controller: 'StudentGroupController'
    	})
    	.when('/student/homework',{
    		templateUrl: 'app/views/student.homework.template.html',
    		controller: 'StudentHomeworkController'
    	})
		.otherwise('/');
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');
}]);