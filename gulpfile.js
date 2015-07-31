var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var prefix = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./",
        online: false
    });

    gulp.watch("_/sass/*.scss", ['sass']);
    gulp.watch("_/js/*.js", ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass-style', function () {
    return sass('_/sass/style.scss', {container: 'gulp-ruby-sass-style'})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(plumber())
        .pipe(prefix('last 2 versions'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest("_/css"))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('_/components/css'))
        .pipe(browserSync.stream());
        // .pipe(gulp.dest('_/css'))
        // .pipe(browserSync.stream());
});

gulp.task('sass-bootstrap', function () {
    return sass('_/sass/bootstrap.scss', {container: 'gulp-ruby-sass-bootstrap'})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(plumber())
        .pipe(prefix('last 2 versions'))
        .pipe(concat('bootstrap.css'))
        .pipe(gulp.dest("_/css"))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('_/components/css'))
        .pipe(browserSync.stream());
        // .pipe(gulp.dest('_/css'))
        // .pipe(browserSync.stream());
});

gulp.task('sass', ['sass-style', 'sass-bootstrap']);
// gulp.task('sass', function() {
//     return gulp.src("_/sass/*.scss")
//         .pipe(sass())
//         .pipe(plumber())
//         .pipe(prefix('last 2 versions'))
//         .pipe(concat('style.css'))
//         .pipe(gulp.dest("_/css"))
//         .pipe(uglify())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('_/components/css'))
//         .pipe(browserSync.stream());
// });

/* Scripts task */
gulp.task('scripts', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    // '_/js/bootstrap.js',
    // '_/js/jquery.js',
    '_/js/myscript.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('_/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('_/components/js'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);