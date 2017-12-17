var app=angular.module("application",["ngRoute","ngAnimate","ngSanitize","ui.bootstrap","xeditable"]);app.config(["$routeProvider","$locationProvider",function(t,e){e.hashPrefix(""),t.when("/",{templateUrl:"app/views/home.template.html",controller:"HomeController"}).when("/reg",{templateUrl:"app/views/registration.template.html",controller:"RegistrationController"}).when("/student/:studentId",{templateUrl:"app/views/student.home.template.html",controller:"StudentHomeController"}).when("/student/:studentId/editProfile",{templateUrl:"app/views/student.edit.profile.template.html",controller:"StudentEditProfileController"}).when("/student/:studentId/group/:groupId",{templateUrl:"app/views/student.group.template.html",controller:"StudentGroupController"}).when("/student/:studentId/homework/:homeworkId",{templateUrl:"app/views/student.homework.template.html",controller:"StudentHomeworkController"}).otherwise("/")}]),app.config(["$httpProvider",function(t){t.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("authToken")}]),app.constant("webApi",{DOMAIN:"http://node1.fe.a-level.com.ua"}),function(){"use strict";app.factory("DataRepository",["$http","webApi",function(t,e){function o(){return t.get(e.DOMAIN+"/api/v1/groups")}function n(o){return t.post(e.DOMAIN+"/api/v1/students",o)}function r(o){return t.post(e.DOMAIN+"/api/v1/account/login",o)}function a(o){return t.get(e.DOMAIN+"/api/v1/news?count=3&page="+o+"&orderBy=date_added&dir=")}function u(o){return t.get(e.DOMAIN+"/api/v1/groupsByStudent/"+o)}function l(o){return t.get(e.DOMAIN+"/api/v1/studentsByGroup/"+o)}function i(o){return t.get(e.DOMAIN+"/api/v1/groups/"+o)}function s(o){return t.get(e.DOMAIN+"/api/v1/teachersByGroup/"+o)}return{getGroupList:o,setStudent:n,getUser:r,getNews:a,getGroupsByStudent:u,getStudentsByGroup:l,getGroup:i,getTeachersByGroup:s}}])}(),function(){"use strict";app.controller("HomeController",["$scope",function(t){}])}(),function(){"use strict";app.controller("HeaderController",["$scope","$location","DataRepository","$http",function(t,e,o,n){t.newLogin={login:"",password:""},t.logVal=!0,t.enterOnSite=function(){o.getUser(t.newLogin).then(function(o){var r=o.data;n.defaults.headers.common.Authorization="Bearer "+o.data.authToken,1===r.role_id?e.path("/student/"+r.id):e.path("/");var a=JSON.stringify(r);localStorage.setItem("user",a),localStorage.setItem("authToken",r.authToken),t.logVal=!0},function(e){console.log(e),t.logVal=!1})}}])}(),function(){"use strict";app.controller("RegistrationController",["$scope","DataRepository",function(t,e){var o={firstname:"",lastname:"",email:"",login:"",password:"",group_id:null};t.newUser=angular.extend({},o),e.getGroupList().then(function(e){t.someGroup=e.data},function(t){console.log(t)}),t.dispatchForm=function(){console.log(t.newUser),e.setStudent(t.newUser).then(function(t){},function(t){console.log(t.data)})}}])}(),function(){"use strict";app.controller("StudentHomeController",["$scope",function(t){}])}(),function(){"use strict";app.controller("StudentHeaderController",["$scope","DataRepository","$location",function(t,e,o){var n=JSON.parse(localStorage.getItem("user"));t.userName=n.firstname,t.studentId=n.id,t.logOut=function(){localStorage.clear(),o.path("/")}}])}(),function(){"use strict";app.controller("StudentMenuController",["$scope","DataRepository",function(t,e){t.studentId=localStorage.getItem("id"),e.getGroupsByStudent(t.studentId).then(function(e){t.groupsByStudent=e.data},function(t){}),t.setGroupId=function(t){localStorage.setItem("groupId",t)}}])}(),function(){"use strict";app.controller("NewsController",["$scope","DataRepository",function(t,e){t.currentPage=1,t.totalItems=30,e.getNews(t.currentPage).then(function(e){t.someNews=e.data},function(t){console.log(t)}),t.pageChanged=function(){e.getNews(t.currentPage).then(function(e){t.someNews=e.data},function(t){console.log(t)})}}])}(),function(){"use strict";app.controller("StudentGroupController",["$scope","DataRepository",function(t,e){var o=localStorage.getItem("groupId");e.getGroup(o).then(function(n){t.groupByStudent=n.data,e.getTeachersByGroup(o).then(function(e){t.teacherByGroup=e.data},function(t){}),e.getStudentsByGroup(o).then(function(e){t.studentsByGroup=e.data},function(t){})},function(t){})}])}(),function(){"use strict";app.controller("StudentHomeworkController",["$scope","DataRepository",function(t,e){t.data={"static":!0},t.homeworksDone=[],t.homeworksToDo=[],t.sendHomework=function(){console.log("отправил ссылку")}}])}(),function(){"use strict";app.controller("StudentEditProfileController",["$scope",function(t){var e=JSON.parse(localStorage.getItem("user"));t.user=e,t.saveData=function(){console.log("success")}}])}();