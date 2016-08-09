var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();
var del = require('del');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');


gulp.task('styles', function(){
  var processor = [
    atImport,
    autoprefixer({browsers: ['last 2 version']}),
  ];
  gulp.src('src/postcss/custom.css')
  .pipe(postcss(processor))
  .pipe(gulp.dest('src/css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
  gulp.src('src/js/**/*.js')
  .pipe(gulp.dest('dist/scripts'));
});
gulp.task('useref', function(){
  return gulp.src('src/*.html')
  .pipe(useref({searchPath: ['src', '.']}))
  .pipe(gulp.dest('dist'))
});
gulp.task('fonts', function(){
  return gulp.src(['bower_components/bootstrap/dist/fonts/**.*',
  'bower_components/font-awesome/fonts/**.*'
])
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulp.dest('src/fonts'));
});

gulp.task('serve', ['styles'], function(){
  browserSync.init({
    port:8881,
    server: {
      baseDir: ['src'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
  gulp.watch('src/postcss/*.css', ['styles']);
  gulp.watch('src/postcss/**/*.css', ['styles']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/*.js').on('change', browserSync.reload);
});

gulp.task('serve:dist', function(){
  browserSync.init({
    port:8881,
    server: {
      baseDir: ['dist']
    }
  });
});
// This task to empty the dist folder
gulp.task('clean', function(){
  return del(['dist/**/*']);
});

gulp.task('build:dist', ['clean', 'styles', 'scripts', 'useref', 'fonts'])
{

}
