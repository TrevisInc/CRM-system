(function () {
	'use strict';
	
	app.factory('DataRepository', ['$http', 'webApi', function ($http, webApi) {
		return {
			getGroupList: _getGroupList,
			getUser: _getUser,
			getNews: _getNews,
			getData: _getData
		};
	
		function _getGroupList() {
			return $http.get(webApi.DOMAIN + '/data/ListGroup.json');
		}

		function _getUser() {
			return $http.get(webApi.DOMAIN + '/data/User.json');
		}

		function _getNews() {
			return $http.get(webApi.DOMAIN + '/data/SomeNews.json');
		}
		function _getData() {
			return $http.get(webApi.DOMAIN +  '/data/Angularjs.json');
		}
	}]);
})();