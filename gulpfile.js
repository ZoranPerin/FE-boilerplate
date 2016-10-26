var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var combineMq = require('gulp-combine-mq');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var scripts = [
    'assets/js/vendors/jquery.min.js',
    'assets/js/vendors/plugins.js',
    'assets/js/main.js'
];

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '',
       index: "index.html"
    },
  })
})

gulp.task('scss', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
});

gulp.task('scripts', function () {
    return gulp.src( scripts )
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/js'));
});

//  templates
gulp.task('templates', function() {
    return gulp.src('**/*.html')
        .on("end", reload);
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('./assets/sass/**/*.scss', ['scss']);
    gulp.watch('./assets/js/**/*.js', ['scripts']);
    gulp.watch('./**/*.html', ['templates']);
});

gulp.task('default', ['scripts', 'sass']);