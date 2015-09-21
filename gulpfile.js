// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Development Dependencies
var eslint = require('gulp-eslint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

var main = 'app';

gulp.task('lint-client', function () {
  return gulp.src(['./client/**/*.js', './gulpfile.js'])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});

gulp.task('lint-test', function () {
  return gulp.src(['./test/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('browserify-client', ['lint-client'], function() {
  return gulp.src('client/index.js')
    .pipe(browserify({
      insertGlobals: false,
      debug: true
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('test/client/index.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('client-test.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('test', ['lint-test', 'browserify-test'], function() {
  return gulp.src('test/client/index.html')
    .pipe(mochaPhantomjs());
});

gulp.task('watch', function() {
  gulp.watch('client/**/*.js*', ['browserify-client', 'test']);
  gulp.watch('test/client/**/*.js', ['test']);
  gulp.watch('client/less/**/*.less', ['styles']);
});
gulp.task('styles', function() {
  return gulp.src('client/less/index.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename(main + '.css'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/style'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('build/' + main + '.css')
    .pipe(minifyCSS())
    .pipe(rename(main + '.min.css'))
    .pipe(gulp.dest('public/style'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('build/' + main + '.js')
    .pipe(uglify())
    .pipe(rename(main + '.min.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('build', ['uglify', 'minify']);

gulp.task('default', ['test', 'build', 'watch']);
