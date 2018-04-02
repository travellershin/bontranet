var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import');

gulp.task('styles_index',function(){
  return gulp.src('./app/styles/index.css')
  .pipe(postcss([cssImport, nested, cssvars, autoprefixer]))
  .on('error', function(errorInfo){
    console.log(errorInfo.toString());
    this.emit('end');
  })
  .pipe(gulp.dest('./app/public'));
});

gulp.task('styles_hotel',function(){
  return gulp.src('./app/styles/hotel.css')
  .pipe(postcss([cssImport, nested, cssvars, autoprefixer]))
  .on('error', function(errorInfo){
    console.log(errorInfo.toString());
    this.emit('end');
  })
  .pipe(gulp.dest('./app/public'));
});
