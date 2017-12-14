(function () {
	'use strict';
	
	app.factory('DataRepository', ['$http', 'webApi', function ($http, webApi) {
		return {
			getGroupList: _getGroupList,
			setStudent: _setStudent,
			getUser: _getUser,
			getNews: _getNews,
			getData: _getData,
      getStudents: _getStudents
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

		function _getData() {
			return $http.get(webApi.DOMAIN +  '/data/Angularjs.json');
		}
		
		function _getStudents() {
      return $http.get(webApi.DOMAIN +  '/api/v1/students' );
    }
	}]);
})();