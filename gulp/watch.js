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

  watch('./app/styles/index/**/*.css', function(){
    gulp.start('cssInject_index');
  });
  watch('./app/styles/index.css', function(){
    gulp.start('cssInject_index');
  });

  watch('./app/styles/hotel/**/*.css', function(){
    gulp.start('cssInject_hotel');
  });
  watch('./app/styles/hotel.css', function(){
    gulp.start('cssInject_hotel');
  });

  watch('./app/icons/**/*.svg', function(){
      gulp.start('icons');
  })


})

gulp.task('cssInject_index', ['styles_index'], function(){
  return gulp.src('./app/public/index.css')
    .pipe(browserSync.stream());
});
gulp.task('cssInject_hotel', ['styles_hotel'], function(){
  return gulp.src('./app/public/hotel.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function(){
    browserSync.reload();
})
