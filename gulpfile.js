var gulp = require('gulp'), // Сообственно Gulp JS
    uglify = require('gulp-uglify'), // Минификация JS
    csso = require('gulp-csso'), // Минификация CSS
    concat = require('gulp-concat'); // Склейка файлов

gulp.task('js', function() {
    gulp.src([
                './app/app.js',
                './app/app.config.js',
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
                './app/controllers/TeacherMenuController.js'
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

gulp.task('bjs', function() {
    gulp.src([
                './bower_components/angular/angular.js',
                './bower_components/angular-route/angular-route.js',
                './bower_components/jquery/dist/jquery.min.js',
                './bower_components/bootstrap/dist/js/bootstrap.min.js',
                './bower_components/angular-animate/angular-animate.min.js',
                './bower_components/angular-sanitize/angular-sanitize.min.js',
                './bower_components/angular-bootstrap/ui-bootstrap.min.js',
                './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                './bower_components/angular-xeditable/dist/js/xeditable.min.js'
        ]) // файлы, которые обрабатываем
        .pipe(concat('b-min.js')) // склеиваем все JS
        .pipe(gulp.dest('./build/')) // результат пишем по указанному адресу
});

gulp.task('watch', function () {
	// При изменение файлов *.js папке " " и подпапках запускаем задачу js
    gulp.watch('./app/**/*.js', ['js']);
    // При изменение файлов *.css папке " " и подпапках запускаем задачу css
    gulp.watch('./css/**/*.css', ['css']);
});