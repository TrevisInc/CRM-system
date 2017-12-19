var app=angular.module("application",["ngRoute","ngAnimate","ngSanitize","ui.bootstrap","xeditable"]);app.config(["$routeProvider","$locationProvider",function(e,t){t.hashPrefix(""),e.when("/",{templateUrl:"app/views/home.template.html",controller:"HomeController"}).when("/reg",{templateUrl:"app/views/registration.template.html",controller:"RegistrationController"}).when("/student/:studentId",{templateUrl:"app/views/student.home.template.html",controller:"StudentHomeController"}).when("/student/:studentId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/student/:studentId/group/:groupId",{templateUrl:"app/views/student.group.template.html",controller:"StudentGroupController"}).when("/student/:studentId/homework",{templateUrl:"app/views/student.homework.template.html",controller:"StudentHomeworkController"}).when("/teacher/:teacherId",{templateUrl:"app/views/teacher.home.template.html",controller:"TeacherHomeController"}).when("/teacher/:teacherId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/teacher/:teacherId/schedule",{templateUrl:"app/views/teacher.schedule.template.html",controller:"TeacherScheduleController"}).otherwise("/")}]),app.config(["$httpProvider",function(e){e.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("authToken")}]),app.constant("webApi",{DOMAIN:"http://node1.fe.a-level.com.ua"}),function(){"use strict";app.factory("DataRepository",["$http","webApi",function(e,t){function o(){return e.get(t.DOMAIN+"/api/v1/groups")}function n(o){return e.post(t.DOMAIN+"/api/v1/students",o)}function r(o){return e.post(t.DOMAIN+"/api/v1/account/login",o)}function a(o){return e.get(t.DOMAIN+"/api/v1/news?count=3&page="+o+"&orderBy=date_added&dir=")}function l(o){return e.get(t.DOMAIN+"/api/v1/students/"+o+"/groups")}function u(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/students")}function s(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o)}function c(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/teachers")}function i(o){return e.get(t.DOMAIN+"/api/v1/teachers/"+o+"/groups")}return{getGroupList:o,setStudent:n,getUser:r,getNews:a,getGroupsByStudent:l,getStudentsByGroup:u,getGroup:s,getTeachersByGroup:c,getGroupsByTeacher:i}}])}(),function(){"use strict";app.controller("HomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("NewsController",["$scope","DataRepository",function(e,t){e.currentPage=1,e.totalItems=30,t.getNews(e.currentPage).then(function(t){e.someNews=t.data},function(e){console.log(e)}),e.pageChanged=function(){t.getNews(e.currentPage).then(function(t){e.someNews=t.data},function(e){console.log(e)})}}])}(),function(){"use strict";app.controller("HeaderController",["$scope","$location","DataRepository","$http",function(e,t,o,n){e.newLogin={login:"",password:""},e.logVal=!0,e.enterOnSite=function(){o.getUser(e.newLogin).then(function(o){var r=o.data;n.defaults.headers.common.Authorization="Bearer "+o.data.authToken,1===r.role_id?t.path("/student/"+r.id):2===r.role_id?t.path("/teacher/"+r.id):t.path("/");var a=JSON.stringify(r);localStorage.setItem("user",a),localStorage.setItem("authToken",r.authToken),e.logVal=!0},function(t){console.log(t),e.logVal=!1})}}])}(),function(){"use strict";app.controller("RegistrationController",["$scope","DataRepository",function(e,t){var o={firstname:"",lastname:"",email:"",login:"",password:"",group_id:null};e.newUser=angular.extend({},o),t.getGroupList().then(function(t){e.someGroup=t.data},function(e){console.log(e)}),e.dispatchForm=function(){console.log(e.newUser),t.setStudent(e.newUser).then(function(e){},function(e){console.log(e.data)})}}])}(),function(){"use strict";app.controller("StudentHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("StudentHeaderController",["$scope","DataRepository","$location",function(e,t,o){var n=JSON.parse(localStorage.getItem("user"));e.userName=n.firstname,e.userId=n.id,e.role=n.role_id,e.logOut=function(){localStorage.clear(),o.path("/")}}])}(),function(){"use strict";app.controller("StudentMenuController",["$scope","DataRepository",function(e,t){e.student=JSON.parse(localStorage.getItem("user")),t.getGroupsByStudent(e.student.id).then(function(t){e.groupsByStudent=t.data},function(e){}),e.setGroupId=function(e){localStorage.setItem("groupId",e)}}])}(),function(){"use strict";app.controller("StudentGroupController",["$scope","DataRepository",function(e,t){var o=localStorage.getItem("groupId");t.getGroup(o).then(function(n){e.groupByStudent=n.data,t.getTeachersByGroup(o).then(function(n){e.teacherByGroup=n.data,t.getStudentsByGroup(o).then(function(t){e.studentsByGroup=t.data},function(e){})},function(e){})},function(e){})}])}(),function(){"use strict";app.controller("StudentHomeworkController",["$scope","DataRepository",function(e,t){e.data={"static":!0},e.homeworksDone=[],e.homeworksToDo=[],e.sendHomework=function(){console.log("отправил ссылку")}}])}(),function(){"use strict";app.controller("UserEditProfileController",["$scope",function(e){var t=JSON.parse(localStorage.getItem("user"));e.user=t,e.role=t.role_id}])}(),function(){"use strict";app.controller("TeacherHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("TeacherMenuController",["$scope","DataRepository",function(e,t){e.user=JSON.parse(localStorage.getItem("user")),t.getGroupsByTeacher(e.user.id).then(function(t){e.groupsByTeacher=t.data},function(e){console.log(e)})}])}(),function(){"use strict";app.controller("TeacherScheduleController",["$scope","DataRepository","$uibModal",function(e,t,o){e.editLesson=function(){o.open({templateUrl:"app/modal/editLesson/template.html",controller:"EditLessonController",size:"md"})}}])}(),function(){function e(e,t,o){e.newLesson={},e.cancel=function(){t.dismiss("cancel")},e.ok=function(){t.close(e.newBook)}}app.controller("EditLessonController",e),e.$inject=["$scope","$uibModalInstance","DataRepository"]}();