var app=angular.module("application",["ngRoute","ngAnimate","ngSanitize","mwl.calendar","ui.bootstrap","xeditable","cgNotify"]);app.config(["$routeProvider","$locationProvider",function(e,t){t.hashPrefix(""),e.when("/",{templateUrl:"app/views/home.template.html",controller:"HomeController"}).when("/reg",{templateUrl:"app/views/registration.template.html",controller:"RegistrationController"}).when("/student/:studentId",{templateUrl:"app/views/student.home.template.html",controller:"StudentHomeController"}).when("/student/:studentId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/student/:studentId/group/:groupId",{templateUrl:"app/views/student.group.template.html",controller:"StudentGroupController"}).when("/student/:studentId/homework",{templateUrl:"app/views/student.homework.template.html",controller:"StudentHomeworkController"}).when("/student/:studentId/schedule/:groupId",{templateUrl:"app/views/student.schedule.template.html",controller:"StudentScheduleController"}).when("/teacher/:teacherId",{templateUrl:"app/views/teacher.home.template.html",controller:"TeacherHomeController"}).when("/teacher/:teacherId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/teacher/:teacherId/schedule",{templateUrl:"app/views/teacher.schedule.template.html",controller:"TeacherScheduleController"}).otherwise("/")}]),app.config(["$httpProvider",function(e){e.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("authToken")}]),function(){"use strict";app.service("utils",["notify",function(e){this.notify=function(t){e.closeAll();var o={message:"",type:"alert",duration:1e3};t=angular.extend(o,t),e({message:t.message,classes:"alert-"+t.type})}}])}(),app.constant("webApi",{DOMAIN:"http://node1.fe.a-level.com.ua"}),function(){"use strict";app.factory("DataRepository",["$http","webApi",function(e,t){function o(){return e.get(t.DOMAIN+"/api/v1/groups")}function n(o){return e.post(t.DOMAIN+"/api/v1/students",o)}function r(o){return e.post(t.DOMAIN+"/api/v1/account/login",o)}function a(o){return e.get(t.DOMAIN+"/api/v1/news?count=3&page="+o+"&orderBy=date_added&dir=")}function s(o){return e.get(t.DOMAIN+"/api/v1/students/"+o+"/groups")}function l(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/students")}function i(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o)}function c(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/teachers")}function u(o){return e.get(t.DOMAIN+"/api/v1/teachers/"+o+"/groups")}function p(o){return e.get(t.DOMAIN+"/api/v1/students/"+o)}function d(o){return e.get(t.DOMAIN+"/api/v1/teachers/"+o)}function g(o){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/schedule")}function f(o,n,r){return e.get(t.DOMAIN+"/api/v1/groups/"+o+"/schedule?page="+n+"&count="+r+"&dir=asc")}function h(o,n){return e.put(t.DOMAIN+"/api/v1/groups/"+o+"/schedule",n)}function m(o){return e.get(t.DOMAIN+"/api/v1/teachers/"+o+"/schedule")}function y(){return e.get(t.DOMAIN+"/api/v1/rooms")}return{getGroupList:o,setStudent:n,getUser:r,getNews:a,getGroupsByStudent:s,getStudentsByGroup:l,getGroup:i,getTeachersByGroup:c,getGroupsByTeacher:u,getStudentData:p,getTeacherData:d,getScheduleData:g,getScheduleDataPage:f,putScheduleData:h,getScheduleTeacher:m,getRooms:y}}])}(),function(){"use strict";app.controller("HomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("NewsController",["$scope","DataRepository",function(e,t){e.currentPage=1,e.totalItems=500,e.maxSize=3,t.getNews(e.currentPage).then(function(t){e.someNews=t.data},function(e){console.log(e)}),e.pageChanged=function(){t.getNews(e.currentPage).then(function(t){e.someNews=t.data},function(e){console.log(e)})}}])}(),function(){"use strict";app.controller("HeaderController",["$scope","$location","DataRepository","$http","utils",function(e,t,o,n,r){e.newLogin={login:"",password:""},e.logVal=!0,e.enterOnSite=function(){o.getUser(e.newLogin).then(function(o){var a=o.data;n.defaults.headers.common.Authorization="Bearer "+o.data.authToken,1===a.role_id?t.path("/student/"+a.id):2===a.role_id?t.path("/teacher/"+a.id):t.path("/"),localStorage.setItem("role_id",a.role_id),localStorage.setItem("id",a.id),localStorage.setItem("authToken",a.authToken),r.notify({message:"Добро пожаловать, "+a.firstname+" !",type:"success"}),e.logVal=!0},function(t){console.log(t),t.status===-1?r.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"}):401===t.status&&(""===t.config.data.login&&""===t.config.data.password||void 0===t.config.data.login||void 0===t.config.data.password?r.notify({message:"Для входа в систему, авторизируйтесь пожалуйста",type:"danger"}):r.notify({message:"Проверьте, пожалуйста, верность введенных данных и попробуйте войти снова",type:"danger"})),e.logVal=!1})}}])}(),function(){"use strict";app.controller("RegistrationController",["$scope","DataRepository",function(e,t){var o={firstname:"",lastname:"",email:"",login:"",password:"",group_id:null};e.newUser=angular.extend({},o),t.getGroupList().then(function(t){e.someGroup=t.data},function(e){console.log(e)}),e.dispatchForm=function(){console.log(e.newUser),t.setStudent(e.newUser).then(function(e){},function(e){console.log(e.data)})}}])}(),function(){"use strict";app.controller("StudentHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("StudentHeaderController",["$scope","DataRepository","$location",function(e,t,o){e.role=localStorage.getItem("role_id"),e.userId=localStorage.getItem("id"),1==e.role?t.getStudentData(e.userId).then(function(t){e.userName=t.data.firstname},function(e){console.log(e)}):2==e.role&&t.getTeacherData(e.userId).then(function(t){e.userName=t.data.firstname},function(e){console.log(e)}),e.logOut=function(){localStorage.clear(),o.path("/")}}])}(),function(){"use strict";app.controller("StudentMenuController",["$scope","DataRepository",function(e,t){e.student=localStorage.getItem("id"),t.getGroupsByStudent(e.student).then(function(t){e.groupsByStudent=t.data},function(e){}),e.setGroupId=function(e){sessionStorage.setItem("groupId",e)}}])}(),function(){"use strict";app.controller("StudentGroupController",["$scope","DataRepository","utils",function(e,t,o){var n=sessionStorage.getItem("groupId");t.getGroup(n).then(function(r){e.groupByStudent=r.data,t.getStudentsByGroup(n).then(function(t){e.studentsByGroup=t.data},function(e){404===e.status&&o.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},function(e){})}])}(),function(){"use strict";app.controller("StudentHomeworkController",["$scope","DataRepository",function(e,t){e.data={"static":!0},e.homeworksDone=[],e.homeworksToDo=[],e.sendHomework=function(){console.log("отправил ссылку")}}])}(),function(){"use strict";app.controller("UserEditProfileController",["$scope","DataRepository",function(e,t){e.role=localStorage.getItem("role_id"),e.userId=localStorage.getItem("id"),1==e.role?t.getStudentData(e.userId).then(function(t){e.user=t.data},function(e){console.log(e)}):2==e.role&&t.getTeacherData(e.userId).then(function(t){e.user=t.data},function(e){console.log(e)})}])}(),function(){"use strict";app.controller("TeacherHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("TeacherMenuController",["$scope","DataRepository",function(e,t){e.user=localStorage.getItem("id"),t.getGroupsByTeacher(e.user).then(function(t){e.groupsByTeacher=t.data},function(e){console.log(e)})}])}(),function(){"use strict";app.controller("TeacherScheduleController",["$scope","DataRepository","utils","$uibModal","calendarConfig",function(e,t,o,n,r){var a=localStorage.getItem("id");e.calendarView="month",e.viewDate=new Date;var s=[{label:"<i class='glyphicon glyphicon-pencil'></i>",onClick:function(e){sessionStorage.setItem("id_lesson",e.calendarEvent.idLesson);var r=n.open({templateUrl:"app/modal/editLesson/template.html",controller:"EditLessonController",size:"md"});r.result.then(function(n){t.putScheduleData(e.calendarEvent.idLesson,n).then(function(e){o.notify({message:"Тема урока успешно сохранена",type:"success"})},function(e){o.notify({message:"Тему урока сохранить не удалось, повторите попытку чуть позже",type:"danger"})})},function(e){})}}];e.events=[],t.getScheduleTeacher(a).then(function(t){t.data.forEach(function(t){e.events.push({title:"Группа: "+t.group_id+" Тема: "+t.theme,color:r.colorTypes.info,startsAt:new Date(t.date.substr(0,10)+" "+t.time),endsAt:new Date(t.date.substr(0,10)+" 22:00:00"),draggable:!0,resizable:!0,actions:s,idLesson:t.id})})},function(e){o.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})}),e.cellIsOpen=!0,e.timespanClicked=function(t,o){"month"===e.calendarView?e.cellIsOpen&&moment(t).startOf("day").isSame(moment(e.viewDate).startOf("day"))||0===o.events.length||!o.inMonth?e.cellIsOpen=!1:(e.cellIsOpen=!0,e.viewDate=t):"year"===e.calendarView&&(e.cellIsOpen&&moment(t).startOf("month").isSame(moment(e.viewDate).startOf("month"))||0===o.events.length?e.cellIsOpen=!1:(e.cellIsOpen=!0,e.viewDate=t))}}])}(),function(){"use strict";app.controller("StudentScheduleController",["$scope","DataRepository","utils",function(e,t,o){var n=sessionStorage.getItem("groupId"),r=[];t.getGroup(n).then(function(t){e.group=t.data},function(e){o.notify({message:"При загрузке данных, связь с сервером установить не удалось, попробуйте позже",type:"danger"})}),t.getRooms().then(function(e){r=e.data},function(e){o.notify({message:"При загрузке данных, связь с сервером установить не удалось, попробуйте позже",type:"danger"})}),e.currentPage=1;var a=9;t.getScheduleData(n).then(function(s){var l=s.data;e.totalItems=Object.keys(l).length+a,e.maxSize=Math.ceil(e.totalItems/a);for(var i=1;i<l.length;i++){var c=new Date,u=new Date(l[i].date);if(u>c){e.currentPage=Math.ceil(i/a);break}}t.getScheduleDataPage(n,e.currentPage,a).then(function(t){e.schedule=t.data,e.schedule.forEach(function(e){e.room_id=r.filter(function(t){return t.id===e.room_id})[0].title})},function(e){o.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},function(e){o.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})}),e.pageChanged=function(){t.getScheduleDataPage(n,e.currentPage,a).then(function(t){e.schedule=t.data,e.schedule.forEach(function(e){e.room_id=r.filter(function(t){return t.id===e.room_id})[0].title})},function(e){o.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},e.controlDate=function(e){var t=new Date,o=new Date(e);return o>t?(console.log("true"),!0):(console.log("false"),!1)}}])}(),function(){function e(e,t,o,n){var r=sessionStorage.getItem("id_lesson");o.getScheduleTeacher(localStorage.getItem("id")).then(function(t){t.data.forEach(function(t){t.id==r&&(e.lesson=t)})},function(e){n.notify({message:"Произошла ошибка загрузки занятия, повторите ваш запрос позже",type:"danger"})}),e.cancel=function(){t.dismiss("cancel")},e.ok=function(){sessionStorage.clear(),t.close(e.lesson)}}app.controller("EditLessonController",e),e.$inject=["$scope","$uibModalInstance","DataRepository","utils"]}();