var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    del = require('del');

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render:{
                css: {
                    template: "./gulp/sprite.css"
                }
            }
        }
    }
}

gulp.task('beginClean', function(){
    return del(['./app/blink/sprite', './app/public/assets/sprites'])
});

gulp.task('createSprite',['beginClean'], function(){
    return gulp.src('./app/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/blink/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function(){
    return gulp.src('./app/blink/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/public/assets/sprites'));
})

gulp.task('copySpriteCSS', ['createSprite'], function(){
    return gulp.src('./app/blink/sprite/css/*.css')
        .pipe(gulp.dest('./app/styles/modules'));
});

gulp.task('endClean',['copySpriteCSS', 'copySpriteCSS'] , function(){
    return del('./app/blink')
})

gulp.task('icons', ['beginClean','createSprite', 'copySpriteGraphic', 'copySpriteCSS','endClean'])
