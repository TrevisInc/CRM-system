(function () {
	'use strict';
	
	app.factory('DataRepository', ['$http', 'webApi', function ($http, webApi) {
		return {
			getGroupList: _getGroupList,
			setStudent: _setStudent,
			getUser: _getUser,
			getNews: _getNews,
			getGroupsByStudent: _getGroupsByStudent,
			getStudentsByGroup: _getStudentsByGroup,
			getGroup: _getGroup,
			getTeachersByGroup: _getTeachersByGroup,
			getGroupsByTeacher: _getGroupsByTeacher
		};
	
		function _getGroupList() {
			return $http.get(webApi.DOMAIN + '/api/v1/groups'); // Получение списка групп при регистрации
		}

		function _setStudent(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/students', data); // регистрация(нужно сделать под всех)
		}

		function _getUser(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/account/login', data);  // логин
		}

		function _getNews(data) {
			return $http.get(webApi.DOMAIN + '/api/v1/news?count=3&page='+ data + '&orderBy=date_added&dir=' ); // Получение новостей
		}
		
		function _getGroupsByStudent(studentId) {
			return $http.get(webApi.DOMAIN + '/api/v1/students/' + studentId + '/groups'); // Получение групп студента
		}
		
		function _getStudentsByGroup(groupId) {
			return $http.get(webApi.DOMAIN +'/api/v1/groups/' + groupId + '/students'); // Получение студентов группы студента
		}
	
		function _getGroup(groupId) {
		  	return $http.get(webApi.DOMAIN + '/api/v1/groups/' + groupId); // Получение данных о группе
		}
		
		function _getTeachersByGroup(groupId) {
		  	return $http.get(webApi.DOMAIN + '/api/v1/groups/' + groupId + '/teachers'); // Получениe преподавателей в  группе
		}

		function _getGroupsByTeacher(data) {
		  	return $http.get(webApi.DOMAIN + '/api/v1/teachers/' + data + '/groups'); // Получение групп преподавателя
		}
	}]);
})();