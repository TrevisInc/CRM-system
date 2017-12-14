var app=angular.module("application",["ngRoute","ngAnimate","ngSanitize","ui.bootstrap"]);app.config(["$routeProvider","$locationProvider",function(t,e){e.hashPrefix(""),t.when("/",{templateUrl:"app/views/home.template.html",controller:"HomeController"}).when("/reg",{templateUrl:"app/views/registration.template.html",controller:"RegistrationController"}).when("/student",{templateUrl:"app/views/student.home.template.html",controller:"StudentHomeController"}).when("/student/group",{templateUrl:"app/views/student.group.template.html",controller:"StudentGroupController"}).when("/student/homework",{templateUrl:"app/views/student.homework.template.html",controller:"StudentHomeworkController"}).otherwise("/")}]),app.constant("webApi",{DOMAIN:"http://node1.fe.a-level.com.ua"}),function(){"use strict";app.factory("DataRepository",["$http","webApi",function(t,e){function o(){return t.get(e.DOMAIN+"/api/v1/groups")}function n(o){return t.post(e.DOMAIN+"/api/v1/students",o)}function r(){return t.get(e.DOMAIN+"/data/User.json")}function s(o){return t.get(e.DOMAIN+"/api/v1/news?count=3&page="+o+"&orderBy=date_added&dir=")}function l(){return t.get(e.DOMAIN+"/data/Angularjs.json")}function a(){return t.get(e.DOMAIN+"/api/v1/students")}return{getGroupList:o,setStudent:n,getUser:r,getNews:s,getData:l,getStudents:a}}])}(),function(){"use strict";app.controller("HomeController",["$scope",function(t){}])}(),function(){"use strict";app.controller("HeaderController",["$scope","$location","DataRepository",function(t,e,o){t.newLogin={login:"",password:""},t.enterOnSite=function(){e.path("/student")}}])}(),function(){"use strict";app.controller("RegistrationController",["$scope","DataRepository",function(t,e){var o={firstname:"",lastname:"",email:"",login:"",password:"",group_id:null};t.newUser=angular.extend({},o),e.getGroupList().then(function(e){t.someGroup=e.data,console.log(t.someGroup)},function(t){console.log(t)}),t.dispatchForm=function(){console.log(t.newUser),e.setStudent(t.newUser).then(function(t){console.log(t)},function(t){console.log(t.data)})}}])}(),function(){"use strict";app.controller("StudentHomeController",["$scope",function(t){}])}(),function(){"use strict";app.controller("StudentHeaderController",["$scope","DataRepository",function(t,e){e.getUser().then(function(e){t.userName=e.data},function(t){console.log(t)})}])}(),function(){"use strict";app.controller("StudentMenuController",["$scope","DataRepository",function(t,e){e.getUser().then(function(e){t.userGroup=e.data.group},function(t){console.log(t)})}])}(),function(){"use strict";app.controller("NewsController",["$scope","DataRepository",function(t,e){t.currentPage=1,t.totalItems=30,e.getNews(t.currentPage).then(function(e){t.someNews=e.data},function(t){console.log(t)}),t.pageChanged=function(){e.getNews(t.currentPage).then(function(e){t.someNews=e.data},function(t){console.log(t)})}}])}(),function(){"use strict";app.controller("StudentGroupController",["$scope","DataRepository",function(t,e){e.getStudents().then(function(e){t.students=e.data,console.log(t.students)},function(t){})}])}(),function(){"use strict";app.controller("StudentHomeworkController",["$scope","DataRepository",function(t,e){t.data={"static":!0},t.homeworksDone=[],t.homeworksToDo=[],t.sendHomework=function(){console.log("отправил ссылку")}}])}();