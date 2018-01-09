var app=angular.module("application",["ngRoute","ngAnimate","ngSanitize","mwl.calendar","ui.bootstrap","xeditable","cgNotify","file-model"]);app.config(["$routeProvider","$locationProvider",function(e,t){t.hashPrefix(""),e.when("/",{templateUrl:"app/views/home.template.html",controller:"HomeController"}).when("/reg",{templateUrl:"app/views/registration.template.html",controller:"RegistrationController"}).when("/student/:studentId",{templateUrl:"app/views/student.home.template.html",controller:"StudentHomeController"}).when("/student/:studentId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/student/:studentId/group/:groupId",{templateUrl:"app/views/student.group.template.html",controller:"StudentGroupController"}).when("/student/:studentId/homework",{templateUrl:"app/views/student.homework.template.html",controller:"StudentHomeworkController"}).when("/student/:studentId/schedule/:groupId",{templateUrl:"app/views/student.schedule.template.html",controller:"StudentScheduleController"}).when("/student/:studentId/info",{templateUrl:"app/views/student.info.template.html",controller:"StudentInfoController"}).when("/teacher/:teacherId",{templateUrl:"app/views/teacher.home.template.html",controller:"TeacherHomeController"}).when("/teacher/:teacherId/editProfile",{templateUrl:"app/views/user.edit.profile.template.html",controller:"UserEditProfileController"}).when("/teacher/:teacherId/schedule",{templateUrl:"app/views/teacher.schedule.template.html",controller:"TeacherScheduleController"}).when("/teacher/:groupId/journal",{templateUrl:"app/views/teacher.journal.template.html",controller:"TeacherJournalController"}).when("/teacher/:teacherId/info",{templateUrl:"app/views/teacher.info.template.html",controller:"TeacherInfoController"}).otherwise("/")}]),app.config(["$httpProvider",function(e){e.defaults.headers.common.Authorization="Bearer "+localStorage.getItem("authToken")}]),app.run(["editableOptions",function(e){e.theme="bs3"}]),function(){"use strict";app.service("utils",["notify",function(e){this.notify=function(t){e.closeAll();var n={message:"",type:"alert",duration:1e3};t=angular.extend(n,t),e({message:t.message,classes:"alert-"+t.type})}}])}(),app.constant("webApi",{DOMAIN:"http://node1.fe.a-level.com.ua"}),function(){"use strict";app.factory("DataRepository",["$http","webApi",function(e,t){function n(){return e.get(t.DOMAIN+"/api/v1/groups")}function o(n){return e.post(t.DOMAIN+"/api/v1/students",n)}function a(n){return e.post(t.DOMAIN+"/api/v1/account/login",n)}function r(n){return e.get(t.DOMAIN+"/api/v1/news?count=3&page="+n+"&orderBy=date_added&dir=")}function s(n){return e.get(t.DOMAIN+"/api/v1/students/"+n+"/groups")}function i(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/students")}function u(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n)}function l(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/teachers")}function c(n){return e.get(t.DOMAIN+"/api/v1/teachers/"+n+"/groups")}function d(n){return e.get(t.DOMAIN+"/api/v1/students/"+n)}function p(n){return e.get(t.DOMAIN+"/api/v1/teachers/"+n)}function f(n,o,a){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/schedule?page="+o+"&count="+a+"&dir=asc")}function g(n,o){return e.put(t.DOMAIN+"/api/v1/groups/"+n+"/schedule",o)}function h(n){return e.get(t.DOMAIN+"/api/v1/teachers/"+n+"/schedule")}function m(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/schedule")}function w(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/journal")}function y(n,o){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/journal/"+o)}function I(n){return e.put(t.DOMAIN+"/api/v1/journal",n)}function v(){return e.get(t.DOMAIN+"/api/v1/rooms")}function S(n){return e.post(t.DOMAIN+"/api/v1/teachers",n)}function D(n,o){return e.put(t.DOMAIN+"/api/v1/students/"+n,o)}function M(n,o){return e.put(t.DOMAIN+"/api/v1/teachers/"+n,o)}function C(n){return e.get(t.DOMAIN+"/api/v1/groups/"+n+"/info")}function O(n){return e["delete"](t.DOMAIN+"/api/v1/info/"+n)}function N(n,o){return e.post(t.DOMAIN+"/api/v1/groups/"+n+"/info",o,{transformRequest:angular.identity,headers:{"Content-Type":void 0}})}function P(n){return e.post(t.DOMAIN+"/api/v1/users/upload",n,{transformRequest:angular.identity,headers:{"Content-Type":void 0}})}function T(n,o){return e.put(t.DOMAIN+"/api/v1/info/"+o,n)}return{getGroupList:n,setStudent:o,getUser:a,getNews:r,getGroupsByStudent:s,getStudentsByGroup:i,getGroup:u,getTeachersByGroup:l,getGroupsByTeacher:c,getStudentData:d,getTeacherData:p,getScheduleData:m,getScheduleDataPage:f,putScheduleData:g,getScheduleTeacher:h,getJournalGroup:w,getJournalById:y,putStatusInJournal:I,getRooms:v,setTeacher:S,updateStudent:D,updateTeacher:M,getInfoByGroup:C,deleteInfo:O,setInfo:N,editInfo:T,setImage:P}}])}(),function(){"use strict";app.controller("HomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("NewsController",["$scope","DataRepository",function(e,t){e.currentPage=1,e.totalItems=30,e.maxSize=3,t.getNews(e.currentPage).then(function(t){e.someNews=t.data.items},function(e){console.log(e)}),e.pageChanged=function(){t.getNews(e.currentPage).then(function(t){e.someNews=t.data.items},function(e){console.log(e)})}}])}(),function(){"use strict";app.controller("HeaderController",["$scope","$location","DataRepository","$http","utils",function(e,t,n,o,a){e.newLogin={login:"",password:""},e.logVal=!0,e.enterOnSite=function(){n.getUser(e.newLogin).then(function(n){var r=n.data;o.defaults.headers.common.Authorization="Bearer "+n.data.authToken,1===r.role_id?t.path("/student/"+r.id):2===r.role_id?t.path("/teacher/"+r.id):t.path("/"),localStorage.setItem("role_id",r.role_id),localStorage.setItem("id",r.id),localStorage.setItem("authToken",r.authToken),a.notify({message:"Добро пожаловать, "+r.firstname+" !",type:"success"}),e.logVal=!0},function(t){console.log(t),t.status===-1?a.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"}):401===t.status&&(""===t.config.data.login&&""===t.config.data.password||void 0===t.config.data.login||void 0===t.config.data.password?a.notify({message:"Для входа в систему, авторизируйтесь пожалуйста",type:"danger"}):a.notify({message:"Проверьте, пожалуйста, верность введенных данных и попробуйте войти снова",type:"danger"})),e.logVal=!1})}}])}(),function(){"use strict";app.controller("RegistrationController",["$scope","DataRepository","utils",function(e,t,n){var o={firstname:"",lastname:"",email:"",login:"",password:"",group_id:null};e.newUser=angular.extend({},o),e.testOnTeacher=!1,e.testOnTeacherClick=function(){e.testOnTeacher=!e.testOnTeacher},t.getGroupList().then(function(t){e.someGroup=t.data},function(e){console.log(e)}),e.dispatchForm=function(){e.testOnTeacher===!0?(delete e.newUser.group_id,t.setTeacher(e.newUser).then(function(t){n.notify({message:"Сотрудник, "+e.newUser.firstname+" успешно зарегистрирован!",type:"success"})},function(e){var t="";422===e.status?("password"===e.data.error[0].field?t='"Пароль", - содержит минимум 6 символов':"firstname"===e.data.error[0].field?t='"Имя", - содержит от 3 до 15 символов':"lastname"===e.data.error[0].field?t='"Фамилия", - содержит от 3 до 15 символов':"login"===e.data.error[0].field&&(t='"Логин", - содержит от 5 до 15 символов'),n.notify({message:"Некорректно заполненное поле "+t,type:"danger"})):n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})):t.setStudent(e.newUser).then(function(t){n.notify({message:"Студент, "+e.newUser.firstname+" успешно зарегистрирован!",type:"success"})},function(e){var t="";422===e.status?("password"===e.data.error[0].field?t='"Пароль", - содержит минимум 6 символов':"firstname"===e.data.error[0].field?t='"Имя", - содержит от 3 до 15 символов':"lastname"===e.data.error[0].field?t='"Фамилия", - содержит от 3 до 15 символов':"login"===e.data.error[0].field&&(t='"Логин", - содержит от 5 до 15 символов'),n.notify({message:"Некорректно заполненное поле "+t,type:"danger"})):n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})}),e.testOnTeacher=!1}}])}(),function(){"use strict";app.controller("StudentHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("StudentHeaderController",["$scope","DataRepository","$location",function(e,t,n){e.role=localStorage.getItem("role_id"),e.userId=localStorage.getItem("id"),1==e.role?t.getStudentData(e.userId).then(function(t){e.userName=t.data.firstname,e.userImage=t.data.image},function(e){console.log(e)}):2==e.role&&t.getTeacherData(e.userId).then(function(t){e.userName=t.data.firstname,e.userImage=t.data.image},function(e){console.log(e)}),e.logOut=function(){localStorage.clear(),n.path("/")}}])}(),function(){"use strict";app.controller("StudentMenuController",["$scope","DataRepository",function(e,t){e.student=localStorage.getItem("id"),t.getGroupsByStudent(e.student).then(function(t){e.groupsByStudent=t.data},function(e){}),e.setGroupId=function(e){sessionStorage.setItem("groupId",e)}}])}(),function(){"use strict";app.controller("StudentGroupController",["$scope","DataRepository","utils",function(e,t,n){var o=sessionStorage.getItem("groupId");t.getGroup(o).then(function(a){e.groupByStudent=a.data,t.getStudentsByGroup(o).then(function(t){e.studentsByGroup=t.data},function(e){404===e.status&&n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},function(e){})}])}(),function(){"use strict";app.controller("StudentHomeworkController",["$scope","DataRepository",function(e,t){e.data={"static":!0},e.homeworksDone=[],e.homeworksToDo=[],e.sendHomework=function(){console.log("отправил ссылку")}}])}(),function(){"use strict";app.controller("UserEditProfileController",["$scope","DataRepository","utils",function(e,t,n){function o(o){1==e.role?t.updateStudent(e.userId,o).then(function(e){n.notify({message:"Изменение успешно.",type:"success"})},function(e){n.notify({message:"Что-то пошло не так, попробуйте позже",type:"danger"})}):2==e.role&&t.updateTeacher(e.userId,o).then(function(e){n.notify({message:"Изменение успешно.",type:"success"})},function(e){n.notify({message:"Что-то пошло не так, попробуйте позже",type:"danger"})})}e.role=localStorage.getItem("role_id"),e.userId=localStorage.getItem("id"),e.passwordShow=!1,e.gitShow=!1,e.testRole=!1,e.editPassword=!1,e.hasErrorStatus=!1,e.newMaterial=null;var a="http://crmsys.filonitta.fe.a-level.com.ua";e.newPass={"new":null,confirm:null};var r={id:+e.userId};e.newData=angular.extend({},r),1==e.role?(e.testRole=!0,t.getStudentData(e.userId).then(function(t){e.user=t.data,""!==e.user.git&&(e.gitShow=!0)},function(e){console.log(e)})):2==e.role&&t.getTeacherData(e.userId).then(function(t){e.user=t.data},function(e){console.log(e)}),e.checkFirstName=function(t){e.newData.firstname=t,o(e.newData)},e.checkLastName=function(t){e.newData.lastname=t,o(e.newData)},e.checkEmail=function(t){e.newData.email=t,o(e.newData)},e.checkPassword=function(e){console.log(e)},e.showPassword=function(){e.passwordShow=!e.passwordShow},e.changePassword=function(){e.editPassword=!e.editPassword},e.showGit=function(t){e.gitShow=!e.gitShow,e.newData.git=t,o(e.newData)},e.confirmPassword=function(){console.log(e.newPass),e.newPass["new"]===e.newPass.confirm?(e.newData.password=e.newPass["new"],o(e.newData),e.editPassword=!e.editPassword,e.passwordShow=!e.passwordShow):(e.hasErrorStatus=!e.hasErrorStatus,n.notify({message:"Пароли не совпадают !",type:"danger"})),e.newPass["new"]=null,e.newPass.confirm=null},e.canselEdit=function(){e.editPassword=!e.editPassword,e.passwordShow=!e.passwordShow},e.changeGit=function(t){e.newData.git=t,o(e.newData)},e.updateImage=function(){var r=new FormData;r.append("image",e.newMaterial),t.setImage(r).then(function(t){e.newData.image=a+t.data.image,e.user.image=e.newData.image,o(e.newData)},function(e){console.log(e),"No file data"===e.data.message?n.notify({message:"Картинка не выбрана",type:"danger"}):n.notify({message:"Выбрать картинку не удалось, повторите попытку позже",type:"danger"})})}}])}(),function(){"use strict";app.controller("TeacherHomeController",["$scope",function(e){}])}(),function(){"use strict";app.controller("TeacherMenuController",["$scope","DataRepository",function(e,t){e.user=localStorage.getItem("id"),t.getGroupsByTeacher(e.user).then(function(t){e.groupsByTeacher=t.data},function(e){console.log(e)}),e.setGroupId=function(e){sessionStorage.setItem("groupId",e)}}])}(),function(){"use strict";app.controller("TeacherScheduleController",["$scope","DataRepository","utils","$uibModal","moment","calendarConfig",function(e,t,n,o,a,r){var s=localStorage.getItem("id"),i=[],u=[];e.calendarView="month",e.viewDate=new Date,e.events=[],e.cellIsOpen=!0,t.getRooms().then(function(o){i=o.data,t.getGroupsByTeacher(s).then(function(o){u=o.data,t.getScheduleTeacher(s).then(function(t){t.data.forEach(function(t){for(var n,o,a=0;a<u.length;a++)t.group_id===u[a].id&&(n=u[a].title);for(var a=0;a<i.length;a++)t.group_id===i[a].id&&(o=i[a].title);e.events.push({theme:t.theme,title:"Группа: "+n+"; Аудитория: "+o+"; Тема: "+(t.theme||"<i>empty</i>"),color:r.colorTypes.info,startsAt:new Date(t.date),endsAt:new Date(new Date(t.date).setHours(new Date(t.date).getHours()+3)),draggable:!0,resizable:!0,actions:l,idLesson:t.id,setNewTheme:function(e){var t=this.title.split(" ");t[t.length-1]=e,this.title=t.join(" ")}})})},function(e){n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},function(e){n.notify({message:"При загрузке данных, связь с сервером установить не удалось, попробуйте позже",type:"danger"})})},function(e){n.notify({message:"При загрузке данных, связь с сервером установить не удалось, попробуйте позже",type:"danger"})});var l=[{label:"<i class='glyphicon glyphicon-pencil'></i>",onClick:function(a){sessionStorage.setItem("id_lesson",a.calendarEvent.idLesson);var r=o.open({templateUrl:"app/modal/editLesson/template.html",controller:"EditLessonController",size:"md"});r.result.then(function(o){t.putScheduleData(a.calendarEvent.idLesson,o).then(function(t){n.notify({message:"Тема урока успешно сохранена",type:"success"}),e.events.forEach(function(e){o.id===e.idLesson&&(e.theme=o.theme,e.setNewTheme(e.theme))})},function(e){n.notify({message:"Тему урока сохранить не удалось, повторите попытку чуть позже",type:"danger"})})},function(e){})}}],c=r.dateFormats.hour;r.dateFormats.hour="HH:mm",e.$on("$destroy",function(){r.dateFormats.hour=c}),e.timespanClicked=function(t,n){"month"===e.calendarView?e.cellIsOpen&&a(t).startOf("day").isSame(a(e.viewDate).startOf("day"))||0===n.events.length||!n.inMonth?e.cellIsOpen=!1:(e.cellIsOpen=!0,e.viewDate=t):"year"===e.calendarView&&(e.cellIsOpen&&a(t).startOf("month").isSame(a(e.viewDate).startOf("month"))||0===n.events.length?e.cellIsOpen=!1:(e.cellIsOpen=!0,e.viewDate=t))}}])}(),function(){"use strict";app.controller("StudentScheduleController",["$scope","DataRepository","utils",function(e,t,n){var o=sessionStorage.getItem("groupId"),a=[];t.getGroup(o).then(function(t){e.group=t.data},function(e){n.notify({message:"При загрузке данных, связь с сервером установить не удалось, попробуйте позже",type:"danger"})}),t.getRooms().then(function(e){a=e.data},function(e){n.notify({message:"При загрузке данных, связь с сервером установить не удалось, попробуйте позже",type:"danger"})}),e.currentPage=1;var r=9;t.getScheduleData(o).then(function(s){var i=s.data;e.totalItems=Object.keys(i).length+r,e.maxSize=Math.ceil(e.totalItems/r);for(var u=1;u<i.length;u++){var l=new Date,c=new Date(i[u].date);if(c>l){e.currentPage=Math.ceil(u/r);break}}t.getScheduleDataPage(o,e.currentPage,r).then(function(t){e.schedule=t.data,e.schedule.forEach(function(e){e.room_id=a.filter(function(t){return t.id===e.room_id})[0].title})},function(e){n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},function(e){n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})}),e.pageChanged=function(){t.getScheduleDataPage(o,e.currentPage,r).then(function(t){e.schedule=t.data,e.schedule.forEach(function(e){e.room_id=a.filter(function(t){return t.id===e.room_id})[0].title})},function(e){n.notify({message:"Сервер с данными сейчас недоступен, попробуйте позже",type:"danger"})})},e.controlDate=function(e){var t=new Date,n=new Date(e);return n>t}}])}(),function(){function e(e,t,n,o){var a=sessionStorage.getItem("id_lesson");n.getScheduleTeacher(localStorage.getItem("id")).then(function(t){t.data.forEach(function(t){t.id==a&&(e.lesson=t)})},function(e){o.notify({message:"Произошла ошибка загрузки занятия, повторите ваш запрос позже",type:"danger"})}),e.cancel=function(){t.dismiss("cancel")},e.ok=function(){sessionStorage.clear(),t.close(e.lesson)}}app.controller("EditLessonController",e),e.$inject=["$scope","$uibModalInstance","DataRepository","utils"]}(),function(){"use strict";app.controller("TeacherJournalController",["$scope","DataRepository","$filter",function(e,t,n){var o=sessionStorage.getItem("groupId");t.getGroup(o).then(function(t){e.groupName=t.data.title},function(e){console.log(e)});var a={student_id:null,date_id:null,status:0};e.newStatus=angular.extend({},a),e.studentPresentCounter=null,e.showResult=!1,e.showError=!1,e.disableBtn=!1,e.dt=null,e.format="dd-MMMM-yyyy",e.popup={opened:!1},e.open=function(){e.popup.opened=!0,e.showError=!1},e.showtable=function(){e.studentPresentCounter=null,e.showError=!1,e.disableBtn=!1,t.getJournalGroup(o).then(function(a){var r=new Date,s=new Date(e.dt),i=a.data.filter(function(t){if(n("date")(t.date,"dd-MM-yyyy")===n("date")(e.dt,"dd-MM-yyyy"))return t})[0];void 0===i?(e.showError=!0,e.showResult=!1):(e.ArrForPrint=i.students,e.showResult=!0,e.newStatus.date_id=i.id,t.getJournalById(o,i.id).then(function(t){e.studentCounter=t.data[0].students.length,r>s&&(e.disableBtn=!0,t.data[0].students.forEach(function(t){1===t.status&&e.studentPresentCounter++}))},function(e){console.log(e)}))},function(e){console.log(e)})},e.statusSuccess=function(n){e.newStatus.student_id=n.id,0===n.status?e.newStatus.status=1:e.newStatus.status=0,n.status=+!n.status,t.putStatusInJournal(e.newStatus).then(function(t){1===n.status?e.studentPresentCounter++:e.studentPresentCounter--},function(e){console.log(e)})}}])}(),function(){"use strict";app.controller("TeacherInfoController",["$scope","DataRepository","utils","$uibModal",function(e,t,n,o){function a(){t.getGroupsByTeacher(r).then(function(o){var a=o.data;a.forEach(function(o){t.getInfoByGroup(o.id).then(function(t){t.data.forEach(function(t){t.link=s+t.link,e.info.push(t)})},function(e){n.notify({message:"При загрузке материалов произошла ошибка, обновите страницу",type:"danger"})})})},function(e){n.notify({message:"При загрузке групп преподавателя произошла ошибка, обновите страницу",type:"danger"})})}var r=localStorage.getItem("id"),s="http://crmsys.filonitta.fe.a-level.com.ua";e.info=[],a(),e.deleteMaterial=function(a){var r=o.open({templateUrl:"app/modal/confirm/template.html",controller:"ConfirmController",size:"sm"});r.result.then(function(o){o&&t.deleteInfo(a).then(function(t){var o=e.info.filter(function(e){return e.id===a})[0],r=e.info.indexOf(o);e.info.splice(r,1),n.notify({message:"Материал успешно удален",type:"success"})},function(e){n.notify({message:"При удалении материала, произошла ошибка, повторите ваш запрос позже",type:"danger"})})},function(e){})},e.addMaterial=function(){var r=o.open({templateUrl:"app/modal/add-material/template.html",controller:"AddMaterialController",size:"md"});r.result.then(function(o){var r=sessionStorage.getItem("id_group");t.setInfo(r,o).then(function(t){e.info=[],a(),n.notify({message:"Материал успешно добавлен",type:"success"}),sessionStorage.clear()},function(e){console.log(e),n.notify({message:"Добавление материала не удалось",type:"danger"})})},function(e){})},e.saveMaterial=function(e,o){t.editInfo(e,o).then(function(){n.notify({message:"Тема успешно обновлена",type:"success"})},function(e){n.notify({message:"Обновить тему не удалось, попробуйте позже",type:"danger"})})}}])}(),function(){function e(e,t){e.cancel=function(){t.close(!1)},e.ok=function(){t.close(!0)}}app.controller("ConfirmController",e),e.$inject=["$scope","$uibModalInstance"]}(),function(){function e(e,t,n,o){var a=localStorage.getItem("id");e.newMaterial={title:"",file:null},e.group_id=null,n.getGroupsByTeacher(a).then(function(t){e.groups=t.data},function(e){o.notify({message:"При загрузке списка групп произошла ошибка, попробуйте позже",type:"danger"})}),e.cancel=function(){t.dismiss("cancel")},e.ok=function(){var n=new FormData;n.append("title",e.newMaterial.title),n.append("file",e.newMaterial.file),sessionStorage.setItem("id_group",e.group_id),t.close(n)}}app.controller("AddMaterialController",e),e.$inject=["$scope","$uibModalInstance","DataRepository","utils"]}(),function(){"use strict";app.controller("StudentInfoController",["$scope","DataRepository","utils","$uibModal",function(e,t,n,o){var a=localStorage.getItem("id"),r="http://crmsys.filonitta.fe.a-level.com.ua";e.info=[],t.getGroupsByStudent(a).then(function(o){var a=o.data;a.forEach(function(o){t.getInfoByGroup(o.id).then(function(t){t.data.forEach(function(t){t.link=r+t.link;var n=t.link.split(".");"doc"===n[n.length-1]&&(t.hide=!0),e.info.push(t)})},function(e){n.notify({message:"При загрузке материалов произошла ошибка, обновите страницу",type:"danger"})})})},function(e){n.notify({message:"При загрузке групп преподавателя произошла ошибка, обновите страницу",type:"danger"})}),e.readModal=function(e){console.log("ld");var t=e.split(".");"pdf"===t[t.length-1]&&window.open(e)}}])}();