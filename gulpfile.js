var gulp = require('gulp'), // Сообственно Gulp JS
    uglify = require('gulp-uglify'), // Минификация JS
    csso = require('gulp-csso'), // Минификация CSS
    concat = require('gulp-concat'); // Склейка файлов

gulp.task('js', function() {
    gulp.src([
                './app/app.js',
                './app/app.config.js',
                './app/factories/utils.js',
                './app/constants/webApi.constant.js',
                './app/factories/DataRepository.js',
                './app/controllers/HomeController.js',
                './app/controllers/NewsController.js',
                './app/controllers/HeaderController.js',
                './app/controllers/RegistrationController.js',
                './app/controllers/StudentHomeController.js',
                './app/controllers/UserHeaderController.js',
                './app/controllers/StudentMenuController.js',
                './app/controllers/StudentGroupController.js',
                './app/controllers/StudentHomeworkController.js',
                './app/controllers/UserEditProfileController.js',
                './app/controllers/TeacherHomeController.js',
                './app/controllers/TeacherMenuController.js',
                './app/controllers/TeacherScheduleController.js',
                './app/controllers/StudentScheduleController.js',
                './app/modal/editLesson/EditLessonController.js',
                './app/controllers/TeacherJournalController.js',
                './app/controllers/TeacherInfoController.js',
                './app/modal/confirm/ConfirmController.js',
                './app/modal/add-material/AddMaterialController.js',
                './app/controllers/StudentInfoController.js'

        ]) // файлы, которые обрабатываем
        .pipe(concat('min.js')) // склеиваем все JS
        .pipe(uglify()) // получившуюся "портянку" минифицируем 
        .pipe(gulp.dest('./build/')) // результат пишем по указанному адресу
});

gulp.task('css', function() {
    gulp.src([
                './css/student.menu.css',
                './css/style.css'
        ]) // файлы, которые обрабатываем
        .pipe(concat('min.css')) // склеиваем все CSS
        .pipe(csso()) // минифицируем css, полученный на предыдущем шаге
        .pipe(gulp.dest('./build/')) // результат пишем по указанному адресу
});

gulp.task('bcss', function() {
    gulp.src([
                './bower_components/angular-notify/dist/angular-notify.min.css',
                './bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css',
                './bower_components/bootstrap/dist/css/bootstrap.min.css',
                './bower_components/angular-xeditable/dist/css/xeditable.min.css'
        ]) // файлы, которые обрабатываем
        .pipe(concat('b-min.css')) // склеиваем все CSS
        .pipe(gulp.dest('./build/')) // результат пишем по указанному адресу
});

gulp.task('bjs', function() {
    gulp.src([
                './bower_components/jquery/dist/jquery.min.js',
                './bower_components/angular/angular.js',
                './bower_components/angular-route/angular-route.js',
                './bower_components/bootstrap/dist/js/bootstrap.min.js',
                './bower_components/angular-animate/angular-animate.min.js',
                './bower_components/angular-sanitize/angular-sanitize.min.js',
                './bower_components/angular-bootstrap/ui-bootstrap.min.js',
                './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                './bower_components/angular-notify/dist/angular-notify.min.js',
                './bower_components/angular-xeditable/dist/js/xeditable.min.js',
                './bower_components/moment/moment.js',
                './bower_components/angular-xeditable/dist/js/xeditable.js',
                './bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js',
                './bower_components/angular-i18n/angular-locale_ru-ru.js',
                './bower_components/angular-file-model/angular-file-model.js'

        ]) // файлы, которые обрабатываем
        .pipe(concat('b-min.js')) // склеиваем все JS
        .pipe(gulp.dest('./build/')) // результат пишем по указанному адресу
});

gulp.task('fonts', function() {
  gulp.src('./bower_components/bootstrap/fonts/*{ttf,woff,woff2,svg,eot}')
      .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('watch', function () {
	// При изменение файлов *.js папке " " и подпапках запускаем задачу js
    gulp.watch('./app/**/*.js', ['js']);
    // При изменение файлов *.css папке " " и подпапках запускаем задачу css
    gulp.watch('./css/**/*.css', ['css']);
});