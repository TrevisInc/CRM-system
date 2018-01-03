var app=angular.module("application",["ngRoute","ngAnimate","ngSanitize","ui.bootstrap","xeditable","cgNotify","datatables"]);app.config(["$routeProvider","$locationProvider",function(e,t){t.hashPrefix(""),e.when("/",{templateUrl:"app/views/home.template.html",controller:"HomeController"}).when("/reg",{templateUrl:"app/views/registration.template.html",controller:"RegistrationController"}).when("/student/:studentId",{templateUrl:"app/views/student.home.template.html",controller:"StudentHomeController"}).when("/student/:studentId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/student/:studentId/group/:groupId",{templateUrl:"app/views/student.group.template.html",controller:"StudentGroupController"}).when("/student/:studentId/homework",{templateUrl:"app/views/student.homework.template.html",controller:"StudentHomeworkController"}).when("/student/:studentId/schedule/:groupId",{templateUrl:"app/views/student.schedule.template.html",controller:"StudentScheduleController"}).when("/teacher/:teacherId",{templateUrl:"app/views/teacher.home.template.html",controller:"TeacherHomeController"}).when("/teacher/:teacherId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/teacher/:teacherId/schedule",{templateUrl:"app/views/teacher.schedule.template.html",controller:"TeacherScheduleController"}).when("/teacher/:groupId/journal",{templateUrl:"app/views/teacher.journal.template.html",controller:"TeacherJournalController"}).otherwise("/")}]),app.config(["$httpProvider",function(e){e.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("authToken")}]),app.run(["editableOptions",function(e){e.theme="bs3"}]),function(){"use strict";app.service("utils",["notify",function(e){this.notify=function(t){e.closeAll();var o={message:"",type:"alert",duration:1e3};t=angular.extend(o,t),e({message:t.message,classes:"alert-"+t.type})}}])}(),app.constant("webApi",{DOMAIN:"http://node1.fe.a-level.com.ua"}),function(){"use strict";app.factory("DataRepository",["$http","webApi",function(e,t){function o(){return e.get(t.DOMAIN+"/api/v1/groups")}function n(o){return e.post(t.DOMAIN+"/api/v1/students",o)}function r(o){return e.post(t.DOMAIN+"/api/v1/account/login",o)}function a(o){return e.get(t.DOMAIN+"/api/v1/news?count=3&page="+o+"&orderBy=date_added&dir=")}function l(o){return e.get(t.DOMAIN+"/api/v1/students/"+o+"/groups")}function u(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/students")}function s(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o)}function c(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/teachers")}function i(o){return e.get(t.DOMAIN+"/api/v1/teachers/"+o+"/groups")}function p(o){return e.get(t.DOMAIN+"/api/v1/students/"+o)}function d(o){return e.get(t.DOMAIN+"/api/v1/teachers/"+o)}function g(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/schedule")}function f(o,n,r){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/schedule?page="+n+"&count="+r+"&dir=asc")}function h(o,n){return e.put(t.DOMAIN+"/api/v1/groups/"+o+"/schedule",n)}function m(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/journal")}return{getGroupList:o,setStudent:n,getUser:r,getNews:a,getGroupsByStudent:l,getStudentsByGroup:u,getGroup:s,getTeachersByGroup:c,getGroupsByTeacher:i,getStudentData:p,getTeacherData:d,getScheduleData:g,getScheduleDataPage:f,putScheduleData:h,getJournalGroup:m}}])}(),function(){"use strict";app.controller("HomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("NewsController",["$scope","DataRepository",function(e,t){e.currentPage=1,e.totalItems=500,e.maxSize=3,t.getNews(e.currentPage).then(function(t){e.someNews=t.data},function(e){console.log(e)}),e.pageChanged=function(){t.getNews(e.currentPage).then(function(t){e.someNews=t.data},function(e){console.log(e)})}}])}(),function(){"use strict";app.controller("HeaderController",["$scope","$location","DataRepository","$http","utils",function(e,t,o,n,r){e.newLogin={login:"",password:""},e.logVal=!0,e.enterOnSite=function(){o.getUser(e.newLogin).then(function(o){var r=o.data;n.defaults.headers.common.Authorization="Bearer "+o.data.authToken,1===r.role_id?t.path("/student/"+r.id):2===r.role_id?t.path("/teacher/"+r.id):t.path("/"),localStorage.setItem("role_id",r.role_id),localStorage.setItem("id",r.id),localStorage.setItem("authToken",r.authToken),e.logVal=!0},function(t){t.status===-1?r.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"}):401===t.status&&(0===t.config.data.login.length&&0===t.config.data.password.length?r.notify({message:"Для входа в систему, авторизируйтесь пожалуйста",type:"danger"}):r.notify({message:"Проверьте, пожалуйста, верность введенных данных и попробуйте войти снова",type:"danger"})),console.log(t),e.logVal=!1})}}])}(),function(){"use strict";app.controller("RegistrationController",["$scope","DataRepository",function(e,t){var o={firstname:"",lastname:"",email:"",login:"",password:"",group_id:null};e.newUser=angular.extend({},o),t.getGroupList().then(function(t){e.someGroup=t.data},function(e){console.log(e)}),e.dispatchForm=function(){console.log(e.newUser),t.setStudent(e.newUser).then(function(e){},function(e){console.log(e.data)})}}])}(),function(){"use strict";app.controller("StudentHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("StudentHeaderController",["$scope","DataRepository","$location",function(e,t,o){e.role=localStorage.getItem("role_id"),e.userId=localStorage.getItem("id"),1==e.role?t.getStudentData(e.userId).then(function(t){e.userName=t.data.firstname},function(e){console.log(e)}):2==e.role&&t.getTeacherData(e.userId).then(function(t){e.userName=t.data.firstname},function(e){console.log(e)}),e.logOut=function(){localStorage.clear(),o.path("/")}}])}(),function(){"use strict";app.controller("StudentMenuController",["$scope","DataRepository",function(e,t){e.student=localStorage.getItem("id"),t.getGroupsByStudent(e.student).then(function(t){e.groupsByStudent=t.data},function(e){}),e.setGroupId=function(e){sessionStorage.setItem("groupId",e)}}])}(),function(){"use strict";app.controller("StudentGroupController",["$scope","DataRepository","utils",function(e,t,o){var n=sessionStorage.getItem("groupId");t.getGroup(n).then(function(r){e.groupByStudent=r.data,t.getStudentsByGroup(n).then(function(t){e.studentsByGroup=t.data},function(e){404===e.status&&o.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},function(e){})}])}(),function(){"use strict";app.controller("StudentHomeworkController",["$scope","DataRepository",function(e,t){e.data={"static":!0},e.homeworksDone=[],e.homeworksToDo=[],e.sendHomework=function(){console.log("отправил ссылку")}}])}(),function(){"use strict";app.controller("UserEditProfileController",["$scope","DataRepository",function(e,t){e.role=localStorage.getItem("role_id"),e.userId=localStorage.getItem("id"),1==e.role?t.getStudentData(e.userId).then(function(t){e.user=t.data},function(e){console.log(e)}):2==e.role&&t.getTeacherData(e.userId).then(function(t){e.user=t.data},function(e){console.log(e)})}])}(),function(){"use strict";app.controller("TeacherHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("TeacherMenuController",["$scope","DataRepository",function(e,t){e.user=localStorage.getItem("id"),t.getGroupsByTeacher(e.user).then(function(t){e.groupsByTeacher=t.data},function(e){console.log(e)}),e.setGroupId=function(e){sessionStorage.setItem("groupId",e)}}])}(),function(){"use strict";app.controller("TeacherScheduleController",["$scope","DataRepository","$uibModal",function(e,t,o){e.currentPage=0,e.totalItems=500,e.maxSize=4,t.getScheduleData(1).then(function(o){for(var n=o.data,r=0;r<n.length;r++){var a=new Date,l=new Date(n[r].date);if(l>a){e.currentPage=Math.ceil(r/9);break}}t.getScheduleDataPage(1,e.currentPage).then(function(t){e.schedule=t.data},function(e){})},function(e){}),e.pageChanged=function(){t.getScheduleDataPage(1,e.currentPage).then(function(t){e.schedule=t.data},function(e){})},e.controlDate=function(e){var t=new Date,o=new Date(e);return o>t},e.editLesson=function(e){sessionStorage.setItem("id_lesson",e);var n=o.open({templateUrl:"app/modal/editLesson/template.html",controller:"EditLessonController",size:"md"});n.result.then(function(o){t.putScheduleData(e,o).then(function(e){console.log("ok")},function(e){console.log("error",e)})},function(e){})}}])}(),function(){"use strict";app.controller("StudentScheduleController",["$scope","DataRepository","utils",function(e,t,o){var n=sessionStorage.getItem("groupId");t.getGroup(n).then(function(t){e.group=t.data},function(e){}),e.currentPage=1;var r=9;t.getScheduleData(n).then(function(a){var l=a.data;e.totalItems=Object.keys(l).length+r,e.maxSize=Math.ceil(e.totalItems/r);for(var u=1;u<l.length;u++){var s=new Date,c=new Date(l[u].date);if(c>s){e.currentPage=Math.ceil(u/r);break}}t.getScheduleDataPage(n,e.currentPage,r).then(function(t){e.schedule=t.data},function(e){o.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},function(e){o.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})}),e.pageChanged=function(){t.getScheduleDataPage(n,e.currentPage,r).then(function(t){e.schedule=t.data},function(e){o.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},e.controlDate=function(e){var t=new Date,o=new Date(e);return o>t?(console.log("true"),!0):(console.log("false"),!1)}}])}(),function(){function e(e,t,o){var n=sessionStorage.getItem("id_lesson");o.getScheduleData(1).then(function(t){t.data.forEach(function(t){t.id==n&&(e.lesson=t)})},function(e){console.log("Ошибка getScheduleData")}),e.cancel=function(){t.dismiss("cancel")},e.ok=function(){sessionStorage.clear(),t.close(e.lesson)}}app.controller("EditLessonController",e),e.$inject=["$scope","$uibModalInstance","DataRepository"]}(),function(){"use strict";app.controller("TeacherJournalController",["$scope","DataRepository","$filter",function(e,t,o){var n=sessionStorage.getItem("groupId");console.log(n);e.dt=null,e.format="dd-MMMM-yyyy",e.popup={opened:!1},e.open=function(){e.popup.opened=!0},e.showtable=function(){console.log(e.dt),t.getJournalGroup(n).then(function(t){e.someArr=t.data.filter(function(t){return console.log(o("date")(t.date,"dd-MM-yyyy")===o("date")(e.dt,"dd-MM-yyyy")),o("date")(t.date,"dd-MM-yyyy")===o("date")(e.dt,"dd-MMMM-yyyy")})[0],console.log("arr",e.someArr)},function(e){console.log(e)})}}])}();