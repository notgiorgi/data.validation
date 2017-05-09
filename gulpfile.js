var gulp        = require('gulp');

var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');


gulp.task('build', function () {
    return browserify({entries: './src/data/Validation.js', debug: true})
        .transform(babelify, { presets: ["es2015"], global: true })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', function(err) { console.log(err.toString()) }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./src/*.js', ['build']);
});

gulp.task('default', ['watch']);