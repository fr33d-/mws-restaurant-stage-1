/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var prettier = require('gulp-prettier');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('connect', function () {
    return connect.server({
        port: 8000,
        root: './dist',
        livereload: {
            port: 35755
        }
    });
});

gulp.task('lint', function() {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('sass', function () {
    return gulp.src('./css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch(['./css/*.scss', './*.html', './js/*js'], ['sass']);
});

gulp.task('watch', ['sass'], function() {
    gulp.watch([
        './*.html',
        './css/*.scss',
        './js/*js'
    ]).on('change', function (file) {
        gulp.src( file.path)
            .pipe(connect.reload() );
    });
});

gulp.task('prettier', function() {
    gulp.src(['./**/*.js', './**/*.scss', '!node_modules/**'])
        // .pipe(prettier({useFlowParser: true}))
        .pipe(gulp.dest('./dist'));
});

//not yet used
gulp.task('scripts', function() {
    gulp.src('js/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
    gulp.src('js/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//Todo: Copy images and html

gulp.task('data-dist', function() {
    gulp.src('./data/*.json')
        .pipe(gulp.dest('dist/data'));
});

gulp.task('img-dist', function() {
    gulp.src('img/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('html-dist', function() {
    gulp.src('./*.html')
        .pipe(gulp.dest('dist/'));
});

livereload({ start: true });

gulp.task('default', [ 'sass', 'sass:watch', 'watch', 'connect', 'prettier', 'data-dist', 'img-dist', 'html-dist' ]);
