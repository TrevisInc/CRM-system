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
			getGroupsByTeacher: _getGroupsByTeacher,
			getStudentData: _getStudentData,
			getTeacherData: _getTeacherData,
			getScheduleData: _getScheduleData,
			getScheduleDataPage: _getScheduleDataPage,
			putScheduleData: _putScheduleData,
			getScheduleTeacher: _getScheduleTeacher,
			getJournalGroup: _getJournalGroup,
			getJournalById: _getJournalById,
			putStatusInJournal: _putStatusInJournal,
			getRooms: _getRooms,
			setTeacher: _setTeacher,
			updateStudent: _updateStudent,
			updateTeacher: _updateTeacher,
		  	getInfoByGroup: _getInfoByGroup,
		  	deleteInfo: _deleteInfo,
		  	setInfo: _setInfo,
		  	editInfo: _editInfo,
		  	setImage: _setImage
		};
	
		function _getGroupList() {
			return $http.get(webApi.DOMAIN + '/api/v1/groups'); // Получение списка групп при регистрации
		}

		function _setStudent(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/students', data); // регистрация нового студента
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

		function _getStudentData(data) {
			return $http.get(webApi.DOMAIN + '/api/v1/students/' + data); // Получение данных о студенте
		}

		function _getTeacherData(data) {
			return $http.get(webApi.DOMAIN + '/api/v1/teachers/' + data); // Получение данных о преподавателе
		}
		
		function _getScheduleDataPage(groupId, currentPage, count) {
		  return $http.get(webApi.DOMAIN + '/api/v1/groups/' + groupId +'/schedule?page=' + currentPage + '&count=' + count +'&dir=asc'); // Получение расписания группы определенной страницы
		}
		
		function _putScheduleData(lessonId, data) {
		  return $http.put(webApi.DOMAIN + '/api/v1/groups/' + lessonId +'/schedule', data); // Изменение темы занятия
		}
		
		function _getScheduleTeacher(data) {
		  return $http.get(webApi.DOMAIN + '/api/v1/teachers/' + data +'/schedule'); // Получение расписания преподавателя
		}

		function _getScheduleData(groupId) {
			return $http.get(webApi.DOMAIN + '/api/v1/groups/' + groupId +'/schedule'); // Получение расписания группы
		}

		function _getJournalGroup(groupId) {
			return $http.get(webApi.DOMAIN + '/api/v1/groups/' + groupId + '/journal'); // Получение журнала группы
		}

		function _getJournalById(groupId, dateId) {
			return $http.get(webApi.DOMAIN + '/api/v1/groups/' + groupId + '/journal/' + dateId); // Получение даты из журнала группы
		}

		function _putStatusInJournal(data) {
			return $http.put(webApi.DOMAIN + '/api/v1/journal', data); // Редактирование посещаемости в журнале
		}
	
		function _getRooms() {
		  return $http.get(webApi.DOMAIN + '/api/v1/rooms'); // Получение аудиторий
		}

		function _setTeacher(data) {
			return $http.post(webApi.DOMAIN + '/api/v1/teachers', data); // регистрация нового преподавателя
		}

		function _updateStudent(studentId, data) {
			return $http.put(webApi.DOMAIN + '/api/v1/students/' + studentId, data); // Редактирование профиля студента
		}

		function _updateTeacher(teacherId, data) {
			return $http.put(webApi.DOMAIN + '/api/v1/teachers/' + teacherId, data); // Редактирование профила преподавателя
		}
		
	
		function _getInfoByGroup(groupId) {
		  	return $http.get(webApi.DOMAIN + '/api/v1/groups/' + groupId + '/info'); // получение материалов группы
		}
	
		function _deleteInfo(materialId) {
		  	return $http.delete(webApi.DOMAIN + '/api/v1/info/' + materialId); // удаление материала
		}
	
		function _setInfo(groupId, data) {
		  	return $http.post(webApi.DOMAIN + '/api/v1/groups/' + groupId + '/info', data, { 
		  		transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
				}
			); // добавление материала
		}

		function _setImage( data) {
		  	return $http.post(webApi.DOMAIN + '/api/v1/users/upload', data, { 
		  		transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
				}
			); // добавление материала
		}

		function _editInfo(data, materialId) {
		  	return $http.put(webApi.DOMAIN + '/api/v1/info/' + materialId, data); // редактирование материала
		}
		
	}]);
})();