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

  return gulp.src('./stylus/**/*.stylus')
    .pipe(plumber())
    .pipe(stylus(option)).pipe(postcss([
      autoprefixer({
        // ☆IEは11以上、Androidは4.4以上
        // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
        browsers: ["last 2 versions", "ie >= 11", "Android >= 4"],
        cascade: false
      })
    ]))
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
