var sass = require('gulp-sass');
var gulp = require('gulp');
var pug = require('gulp-pug');
var browsersync = require('browser-sync');

gulp.task('compileSass' , function() {
  return gulp.src('dev/sass-files/index.scss')
  .pipe(sass({
    outputStyle: 'nested'
  }).on('error', sass.logError))
  .pipe(gulp.dest('dist/css/'))
  .pipe(browsersync.stream())
});

gulp.task('compilePug' , function() {
  return gulp.src('dev/pug-files/index.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', function (){
  gulp.watch('dev/sass-files/index.scss', gulp.series('compileSass'));
  gulp.watch('dev/pug-files/index.pug', gulp.series('compilePug'));
  gulp.watch('dist/**/*.html').on('change', browsersync.reload)
  browsersync.init({
    server: {
      baseDir: './dist'
    }
  })
})