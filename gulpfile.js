var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var postcss = require('gulp-postcss');
var csso = require('gulp-csso');

gulp.task('default', function () {
    return gulp.watch('*.scss',['css']);
});

var browsers = [
    //'last 2 versions',
//    'ie >= 9',
    '> 3%'
];

gulp.task('css', function () {
    return gulp.src('*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sass())
        .pipe(postcss([
            require('doiuse')({browsers: browsers,ignore:['transforms2d']}),
            require('autoprefixer')({browsers: browsers}),
            require('css-mqpacker')
        ]))
        .pipe(csso())
        .pipe(gulp.dest('dest'));
});