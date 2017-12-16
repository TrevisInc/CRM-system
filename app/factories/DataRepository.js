(function () {
	'use strict';
	
	app.factory('DataRepository', ['$http', 'webApi', function ($http, webApi) {
		return {
			getGroupList: _getGroupList,
			setStudent: _setStudent,
			getUser: _getUser,
			getNews: _getNews,
		    getGroupsByStudent: _getGroupsByStudent,
		    getStudentsByGroup: _getStudentsByGroup
		};
	
		function _getGroupList() {
			return $http.get(webApi.DOMAIN + '/api/v1/groups');
			
		}
		function _setStudent(data) {    // регистрация
			return $http.post(webApi.DOMAIN + '/api/v1/students', data);
		}

		function _getUser(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/account/login', data);
		}

		function _getNews(data) {  // получение новостей
			return $http.get(webApi.DOMAIN + '/api/v1/news?count=3&page='+ data + '&orderBy=date_added&dir=' );
		}
		
		function _getGroupsByStudent(studentId) {
      		return $http.get(webApi.DOMAIN + '/api/v1/groupsByStudent/'+ studentId); // Получение групп студента
	    }
	    
	    function _getStudentsByGroup(groupId) {
	      	return $http.get(webApi.DOMAIN + '/api/v1/studentsByGroup/'+ groupId); // Получение студентов группы студента
	    }
		
	}]);
})();