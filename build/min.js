var app=angular.module("application",["ngRoute","ngAnimate","ngSanitize","mwl.calendar","ui.bootstrap","xeditable","cgNotify"]);app.config(["$routeProvider","$locationProvider",function(e,t){t.hashPrefix(""),e.when("/",{templateUrl:"app/views/home.template.html",controller:"HomeController"}).when("/reg",{templateUrl:"app/views/registration.template.html",controller:"RegistrationController"}).when("/student/:studentId",{templateUrl:"app/views/student.home.template.html",controller:"StudentHomeController"}).when("/student/:studentId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/student/:studentId/group/:groupId",{templateUrl:"app/views/student.group.template.html",controller:"StudentGroupController"}).when("/student/:studentId/homework",{templateUrl:"app/views/student.homework.template.html",controller:"StudentHomeworkController"}).when("/student/:studentId/schedule/:groupId",{templateUrl:"app/views/student.schedule.template.html",controller:"StudentScheduleController"}).when("/teacher/:teacherId",{templateUrl:"app/views/teacher.home.template.html",controller:"TeacherHomeController"}).when("/teacher/:teacherId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/teacher/:teacherId/schedule",{templateUrl:"app/views/teacher.schedule.template.html",controller:"TeacherScheduleController"}).when("/teacher/:groupId/journal",{templateUrl:"app/views/teacher.journal.template.html",controller:"TeacherJournalController"}).otherwise("/")}]),app.config(["$httpProvider",function(e){e.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("authToken")}]),app.run(["editableOptions",function(e){e.theme="bs3"}]),function(){"use strict";app.service("utils",["notify",function(e){this.notify=function(t){e.closeAll();var n={message:"",type:"alert",duration:1e3};t=angular.extend(n,t),e({message:t.message,classes:"alert-"+t.type})}}])}(),app.constant("webApi",{DOMAIN:"http://node1.fe.a-level.com.ua"}),function(){"use strict";app.factory("DataRepository",["$http","webApi",function(e,t){function n(){return e.get(t.DOMAIN+"/api/v1/groups")}function o(n){return e.post(t.DOMAIN+"/api/v1/students",n)}function r(n){return e.post(t.DOMAIN+"/api/v1/account/login",n)}function a(n){return e.get(t.DOMAIN+"/api/v1/news?count=3&page="+n+"&orderBy=date_added&dir=")}function s(n){return e.get(t.DOMAIN+"/api/v1/students/"+n+"/groups")}function u(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/students")}function l(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n)}function i(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/teachers")}function c(n){return e.get(t.DOMAIN+"/api/v1/teachers/"+n+"/groups")}function p(n){return e.get(t.DOMAIN+"/api/v1/students/"+n)}function d(n){return e.get(t.DOMAIN+"/api/v1/teachers/"+n)}function g(n,o,r){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/schedule?page="+o+"&count="+r+"&dir=asc")}function f(n,o){return e.put(t.DOMAIN+"/api/v1/groups/"+n+"/schedule",o)}function h(n){return e.get(t.DOMAIN+"/api/v1/teachers/"+n+"/schedule")}function m(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/schedule")}function w(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/journal")}function y(n,o){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/journal/"+o)}function I(n){return e.put(t.DOMAIN+"/api/v1/journal",n)}return{getGroupList:n,setStudent:o,getUser:r,getNews:a,getGroupsByStudent:s,getStudentsByGroup:u,getGroup:l,getTeachersByGroup:i,getGroupsByTeacher:c,getStudentData:p,getTeacherData:d,getScheduleData:m,getScheduleDataPage:g,putScheduleData:f,getScheduleTeacher:h,getJournalGroup:w,getJournalById:y,putStatusInJournal:I}}])}(),function(){"use strict";app.controller("HomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("NewsController",["$scope","DataRepository",function(e,t){e.currentPage=1,e.totalItems=500,e.maxSize=3,t.getNews(e.currentPage).then(function(t){e.someNews=t.data.items},function(e){console.log(e)}),e.pageChanged=function(){t.getNews(e.currentPage).then(function(t){e.someNews=t.data.items},function(e){console.log(e)})}}])}(),function(){"use strict";app.controller("HeaderController",["$scope","$location","DataRepository","$http","utils",function(e,t,n,o,r){e.newLogin={login:"",password:""},e.logVal=!0,e.enterOnSite=function(){n.getUser(e.newLogin).then(function(n){var a=n.data;o.defaults.headers.common.Authorization="Bearer "+n.data.authToken,1===a.role_id?t.path("/student/"+a.id):2===a.role_id?t.path("/teacher/"+a.id):t.path("/"),localStorage.setItem("role_id",a.role_id),localStorage.setItem("id",a.id),localStorage.setItem("authToken",a.authToken),r.notify({message:"Добро пожаловать, "+a.firstname+" !",type:"success"}),e.logVal=!0},function(t){console.log(t),t.status===-1?r.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"}):401===t.status&&(""===t.config.data.login&&""===t.config.data.password||void 0===t.config.data.login||void 0===t.config.data.password?r.notify({message:"Для входа в систему, авторизируйтесь пожалуйста",type:"danger"}):r.notify({message:"Проверьте, пожалуйста, верность введенных данных и попробуйте войти снова",type:"danger"})),e.logVal=!1})}}])}(),function(){"use strict";app.controller("RegistrationController",["$scope","DataRepository",function(e,t){var n={firstname:"",lastname:"",email:"",login:"",password:"",group_id:null};e.newUser=angular.extend({},n),t.getGroupList().then(function(t){e.someGroup=t.data},function(e){console.log(e)}),e.dispatchForm=function(){console.log(e.newUser),t.setStudent(e.newUser).then(function(e){},function(e){console.log(e.data)})}}])}(),function(){"use strict";app.controller("StudentHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("StudentHeaderController",["$scope","DataRepository","$location",function(e,t,n){e.role=localStorage.getItem("role_id"),e.userId=localStorage.getItem("id"),1==e.role?t.getStudentData(e.userId).then(function(t){e.userName=t.data.firstname},function(e){console.log(e)}):2==e.role&&t.getTeacherData(e.userId).then(function(t){e.userName=t.data.firstname},function(e){console.log(e)}),e.logOut=function(){localStorage.clear(),n.path("/")}}])}(),function(){"use strict";app.controller("StudentMenuController",["$scope","DataRepository",function(e,t){e.student=localStorage.getItem("id"),t.getGroupsByStudent(e.student).then(function(t){e.groupsByStudent=t.data},function(e){}),e.setGroupId=function(e){sessionStorage.setItem("groupId",e)}}])}(),function(){"use strict";app.controller("StudentGroupController",["$scope","DataRepository","utils",function(e,t,n){var o=sessionStorage.getItem("groupId");t.getGroup(o).then(function(r){e.groupByStudent=r.data,t.getStudentsByGroup(o).then(function(t){e.studentsByGroup=t.data},function(e){404===e.status&&n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},function(e){})}])}(),function(){"use strict";app.controller("StudentHomeworkController",["$scope","DataRepository",function(e,t){e.data={"static":!0},e.homeworksDone=[],e.homeworksToDo=[],e.sendHomework=function(){console.log("отправил ссылку")}}])}(),function(){"use strict";app.controller("UserEditProfileController",["$scope","DataRepository",function(e,t){e.role=localStorage.getItem("role_id"),e.userId=localStorage.getItem("id"),1==e.role?t.getStudentData(e.userId).then(function(t){e.user=t.data},function(e){console.log(e)}):2==e.role&&t.getTeacherData(e.userId).then(function(t){e.user=t.data},function(e){console.log(e)})}])}(),function(){"use strict";app.controller("TeacherHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("TeacherMenuController",["$scope","DataRepository",function(e,t){e.user=localStorage.getItem("id"),t.getGroupsByTeacher(e.user).then(function(t){e.groupsByTeacher=t.data},function(e){console.log(e)}),e.setGroupId=function(e){sessionStorage.setItem("groupId",e)}}])}(),function(){"use strict";app.controller("TeacherScheduleController",["$scope","DataRepository","utils","$uibModal","calendarConfig",function(e,t,n,o,r){var a=localStorage.getItem("id");e.calendarView="month",e.viewDate=new Date;var s=[{label:"<i class='glyphicon glyphicon-pencil'></i>",onClick:function(e){sessionStorage.setItem("id_lesson",e.calendarEvent.idLesson);var r=o.open({templateUrl:"app/modal/editLesson/template.html",controller:"EditLessonController",size:"md"});r.result.then(function(o){t.putScheduleData(e.calendarEvent.idLesson,o).then(function(e){n.notify({message:"Тема урока успешно сохранена",type:"success"})},function(e){n.notify({message:"Тему урока сохранить не удалось, повторите попытку чуть позже",type:"danger"})})},function(e){})}}];e.events=[],t.getScheduleTeacher(a).then(function(t){t.data.forEach(function(t){e.events.push({title:"Группа: "+t.group_id+" Тема: "+t.theme,color:r.colorTypes.info,startsAt:new Date(t.date.substr(0,10)+" "+t.time),endsAt:new Date(t.date.substr(0,10)+" 22:00:00"),draggable:!0,resizable:!0,actions:s,idLesson:t.id})})},function(e){n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})}),e.cellIsOpen=!0,e.timespanClicked=function(t,n){"month"===e.calendarView?e.cellIsOpen&&moment(t).startOf("day").isSame(moment(e.viewDate).startOf("day"))||0===n.events.length||!n.inMonth?e.cellIsOpen=!1:(e.cellIsOpen=!0,e.viewDate=t):"year"===e.calendarView&&(e.cellIsOpen&&moment(t).startOf("month").isSame(moment(e.viewDate).startOf("month"))||0===n.events.length?e.cellIsOpen=!1:(e.cellIsOpen=!0,e.viewDate=t))}}])}(),function(){"use strict";app.controller("StudentScheduleController",["$scope","DataRepository","utils",function(e,t,n){var o=sessionStorage.getItem("groupId");t.getGroup(o).then(function(t){e.group=t.data},function(e){}),e.currentPage=1;var r=9;t.getScheduleData(o).then(function(a){var s=a.data;e.totalItems=Object.keys(s).length+r,e.maxSize=Math.ceil(e.totalItems/r);for(var u=1;u<s.length;u++){var l=new Date,i=new Date(s[u].date);if(i>l){e.currentPage=Math.ceil(u/r);break}}t.getScheduleDataPage(o,e.currentPage,r).then(function(t){e.schedule=t.data},function(e){n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},function(e){n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})}),e.pageChanged=function(){t.getScheduleDataPage(o,e.currentPage,r).then(function(t){e.schedule=t.data},function(e){n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},e.controlDate=function(e){var t=new Date,n=new Date(e);return n>t?(console.log("true"),!0):(console.log("false"),!1)}}])}(),function(){function e(e,t,n,o){var r=sessionStorage.getItem("id_lesson");n.getScheduleTeacher(localStorage.getItem("id")).then(function(t){t.data.forEach(function(t){t.id==r&&(e.lesson=t)})},function(e){o.notify({message:"Произошла ошибка загрузки занятия, повторите ваш запрос позже",type:"danger"})}),e.cancel=function(){t.dismiss("cancel")},e.ok=function(){sessionStorage.clear(),t.close(e.lesson)}}app.controller("EditLessonController",e),e.$inject=["$scope","$uibModalInstance","DataRepository","utils"]}(),function(){"use strict";app.controller("TeacherJournalController",["$scope","DataRepository","$filter",function(e,t,n){var o=sessionStorage.getItem("groupId");t.getGroup(o).then(function(t){e.groupName=t.data.title},function(e){console.log(e)});var r={student_id:null,date_id:null,status:0};e.newStatus=angular.extend({},r),e.studentPresentCounter=null,e.showResult=!1,e.showError=!1,e.disableBtn=!1,e.dt=null,e.format="dd-MMMM-yyyy",e.popup={opened:!1},e.open=function(){e.popup.opened=!0,e.showError=!1},e.showtable=function(){e.studentPresentCounter=null,e.showError=!1,e.disableBtn=!1,t.getJournalGroup(o).then(function(r){var a=new Date,s=new Date(e.dt),u=r.data.filter(function(t){if(n("date")(t.date,"dd-MM-yyyy")===n("date")(e.dt,"dd-MM-yyyy"))return t})[0];void 0===u?(e.showError=!0,e.showResult=!1):(e.ArrForPrint=u.students,e.showResult=!0,e.newStatus.date_id=u.id,t.getJournalById(o,u.id).then(function(t){e.studentCounter=t.data[0].students.length,a>s&&(e.disableBtn=!0,t.data[0].students.forEach(function(t){1===t.status&&e.studentPresentCounter++}))},function(e){console.log(e)}))},function(e){console.log(e)})},e.statusSuccess=function(n){e.newStatus.student_id=n.id,0===n.status?e.newStatus.status=1:e.newStatus.status=0,n.status=+!n.status,t.putStatusInJournal(e.newStatus).then(function(t){1===n.status?e.studentPresentCounter++:e.studentPresentCounter--},function(e){console.log(e)})}}])}();