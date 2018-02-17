var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){

  browserSync.init({
    notify: false,
    server:{
      baseDir: "app/public"
    }
  })

  watch('./app/public/**/*.html', function(){
    browserSync.reload();
  });

  watch('./app/scripts/**/*.js', function(){
      gulp.start('scriptsRefresh');
  });

  watch('./app/styles/**/*.css', function(){
    gulp.start('cssInject');
  });

  watch('./app/icons/**/*.svg', function(){
      gulp.start('icons');
  })


})

gulp.task('cssInject', ['styles'], function(){
  return gulp.src('./app/public/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function(){
    browserSync.reload();
})
