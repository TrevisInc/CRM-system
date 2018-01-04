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
			templateUrl: 'app/views/user.edit.profile.template.html',
			controller: 'UserEditProfileController'
		})
		.when('/student/:studentId/group/:groupId',{
			templateUrl: 'app/views/student.group.template.html',
			controller: 'StudentGroupController'
		})
		.when('/student/:studentId/homework',{
			templateUrl: 'app/views/student.homework.template.html',
			controller: 'StudentHomeworkController'
		})
	    .when('/student/:studentId/schedule/:groupId',{
	      templateUrl: 'app/views/student.schedule.template.html',
	      controller: 'StudentScheduleController'
	    })
		.when('/teacher/:teacherId',{
			templateUrl: 'app/views/teacher.home.template.html',
			controller: 'TeacherHomeController'
		})
		.when('/teacher/:teacherId/editProfile',{
			templateUrl: 'app/views/user.edit.profile.template.html',
			controller: 'UserEditProfileController'
		})
	    .when('/teacher/:teacherId/schedule',{
	      	templateUrl: 'app/views/teacher.schedule.template.html',
	      	controller: 'TeacherScheduleController'
	    })
	    .when('/teacher/:groupId/journal',{
	      	templateUrl: 'app/views/teacher.journal.template.html',
	      	controller: 'TeacherJournalController'
	    })
		.otherwise('/');
}]);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');
}]);

app.run(['editableOptions', function(editableOptions) {
	editableOptions.theme = 'bs3';
}]);