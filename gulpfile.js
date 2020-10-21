const gulp = require('gulp');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task('stylus', function() {
  var option = {
    outputStyle: 'expanded',
  };

  return gulp.src('./stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus(option)).pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(gulp.dest('./css/'))
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
  gulp.watch('./stylus/*.styl', gulp.task('stylus'));
  gulp.watch('./pug/**/*.pug', gulp.task('pug'));
});

gulp.task('default', gulp.series(gulp.parallel('browser-sync', 'stylus', 'pug', 'watch')));
