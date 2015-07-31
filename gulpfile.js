var gulp = require('gulp');  
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/* Setup scss path */
var paths = {
    scss: '_/sass/*.scss'
};

/* Scripts task */
gulp.task('scripts', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    '_/js/bootstrap.js',
    '_/js/jquery.js',
    '_/js/myscript.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('_/components/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('_/components/js'));
});

/* Sass task */
gulp.task('sass', function () {  
    gulp.src('_/sass/style.scss')
    .pipe(plumber())
    .pipe(prefix('last 2 versions'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('_/css/'))
    .pipe(browserSync.stream());
   
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['_/css/*.css', '_/js/*.js'], {
       ui: {
           port: 80
       }
        
    });
});

browserSync({
   online: false
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'browser-sync'], function () {
    /* Watch scss, run the sass task on change. */
    gulp.watch(['_/sass/*.scss', '_/sass/**/*.scss'], ['sass'])
    /* Watch app.js file, run the scripts task on change. */
    gulp.watch(['_/js/myscript.js'], ['scripts'])
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['*.php'], ['bs-reload']);
});