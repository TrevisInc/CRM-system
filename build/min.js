var app=angular.module("application",["ngRoute","ui.bootstrap"]);app.config(["$routeProvider","$locationProvider",function(t,o){o.hashPrefix(""),t.when("/",{templateUrl:"app/views/home.template.html",controller:"HomeController"}).when("/reg",{templateUrl:"app/views/registration.template.html",controller:"RegistrationController"}).when("/student",{templateUrl:"app/views/student.home.template.html",controller:"StudentHomeController"}).when("/student/group",{templateUrl:"app/views/student.group.template.html",controller:"StudentGroupController"}).when("/student/homework",{templateUrl:"app/views/student.homework.template.html",controller:"StudentHomeworkController"}).otherwise("/")}]),app.constant("webApi",{DOMAIN:"http://node1.fe.a-level.com.ua"}),function(){"use strict";app.factory("DataRepository",["$http","webApi",function(t,o){function e(){return t.get(o.DOMAIN+"/api/v1/groups")}function n(e){return t.post(o.DOMAIN+"/api/v1/students",e)}function r(){return t.get(o.DOMAIN+"/data/User.json")}function l(){return t.get(o.DOMAIN+"/data/SomeNews.json")}function s(){return t.get(o.DOMAIN+"/data/Angularjs.json")}return{getGroupList:e,setStudent:n,getUser:r,getNews:l,getData:s}}])}(),function(){"use strict";app.controller("HomeController",["$scope",function(t){}])}(),function(){"use strict";app.controller("HeaderController",["$scope","$location","DataRepository",function(t,o,e){t.newLogin={login:"",password:""},t.enterOnSite=function(){o.path("/student")}}])}(),function(){"use strict";app.controller("RegistrationController",["$scope","DataRepository",function(t,o){var e={firstname:"",lastname:"",email:"",login:"",password:"",group_id:null};t.newUser=angular.extend({},e),o.getGroupList().then(function(o){t.someGroup=o.data,console.log(t.someGroup)},function(t){}),t.dispatchForm=function(){console.log(t.newUser),o.setStudent(t.newUser).then(function(t){console.log(t)},function(t){console.log(t.data)})}}])}(),function(){"use strict";app.controller("StudentHomeController",["$scope",function(t){}])}(),function(){"use strict";app.controller("StudentHeaderController",["$scope","DataRepository",function(t,o){o.getUser().then(function(o){t.userName=o.data},function(t){console.log(t)})}])}(),function(){"use strict";app.controller("StudentMenuController",["$scope","DataRepository",function(t,o){o.getUser().then(function(o){t.userGroup=o.data.group},function(t){console.log(t)})}])}(),function(){"use strict";app.controller("NewsController",["$scope","DataRepository",function(t,o){o.getNews().then(function(o){t.someNews=o.data},function(t){console.log(t)})}])}(),function(){"use strict";app.controller("StudentGroupController",["$scope","DataRepository",function(t,o){o.getData().then(function(o){t.data=o.data,console.log(t.data)},function(t){})}])}(),function(){"use strict";app.controller("StudentHomeworkController",["$scope","DataRepository",function(t,o){t.homeworksDone=[],t.homeworksToDo=[],o.getData().then(function(o){o.data.homeworks.forEach(function(o){o.checked?t.homeworksDone.push(o):t.homeworksToDo.push(o)})},function(t){}),t.sendHomework=function(){console.log("отправил ссылку")}}])}();