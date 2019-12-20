var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var saas = require('gulp-sass');

//Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*/.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});


//Move the Javascript files into our /src/js folder
gulp.task('js',function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/jquery/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});


//Static Server + Watching all the SCSS and HTML Files underneath the given folders
gulp.task('serve',['saas'],function(){

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],['sass']);
    gulp.watch("src/*.html").on('change',browserSync.reload);
});

gulp.task('default',['js','serve']);