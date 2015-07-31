var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./",
        online: false
    });

    gulp.watch("_/sass/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("_/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("_/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);