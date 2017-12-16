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
		function _setStudent(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/students', data);
		}

		function _getUser() {
			return $http.get(webApi.DOMAIN + '/data/User.json');
		}

		function _getNews(data) {
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