var gulp = require('gulp');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');

gulp.task('stylus', function() {
  var option = {
    outputStyle: 'expanded',
  };

  return gulp.src('./stylus/**/*.stylus')
  .pipe(plumber())
  .pipe(stylus(option))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.stream());
});

gulp.task('pug', function() {
  var option = {
    pretty: true,
  };

  return gulp.src(['./pug/**/*.pug'])
  .pipe(plumber())
  .pipe(pug(option))
  .pipe(rename({
    extname: '.php'
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('browser-sync', function () {
  return browserSync.init({
      files: [''],
      proxy: 'http://localhost/portfolio'
  });
});
gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('watch', function () {
  gulp.watch('./stylus/**/*.stylus', gulp.task('stylus'));
  gulp.watch('./pug/**/*.pug', gulp.task('pug'));
});

gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'stylus', 'pug', 'watch')));
