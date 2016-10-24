var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var uglify = require('gulp-uglifyjs');

gulp.task('scss', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
    return gulp.src('./assets/js/**/*.js')
        .pipe(uglify('scripts.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/sass/**/*.scss', ['scss']);
    gulp.watch('./assets/js/**/*.js', ['scripts']);
});

gulp.task('minifyjs', ['scripts']);

//gulp.task('default', ['scss']);