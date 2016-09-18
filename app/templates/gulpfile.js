var gulp = require('gulp');

var minifycss = require('gulp-minify-css');
var fileinclude = require('gulp-file-include');
var livereload = require('gulp-livereload');
var compass = require('gulp-compass');
var clean = require('gulp-clean');
var replace = require('gulp-replace')
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 8080,
        notify: false, //刷新是否提示
        open: true //是否自动打开页面
    });

    gulp.watch([
        'qwui/html/*.html',
        'qwui/html/*/*.html',
        'qwui/sass/*/*.scss',
        'qwui/sass/*/*/*.scss',
        'qwui/js/*/*.js',
        'qwui/js/*/*/*.js'
        ])
    .on("change", browserSync.reload);
});


gulp.task('style', function() {
    gulp.src('./qwui/sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './dist/css',
            sass: 'qwui/sass'
        }))
        .on('error', function(error) {
            // Would like to catch the error here
            console.log(error);
        })

    .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

gulp.task('html', function() {
    gulp.src(['qwui/html/*.html', 'qwui/html/*/*.html', '!src/html/include/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/html'))
        .pipe(livereload());
});

gulp.task('js', function() {
    gulp.src(['qwui/js/*/*.js', 'qwui/js/*/*/*.js'])
        .on('error', function(error) {
            // Would like to catch the error here
            console.log(error);
        })
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});


// 执行任务
gulp.task('qwui', function() {

    //gulp.run('browser-sync');

    gulp.watch(['qwui/js/*/*.js', 'qwui/js/*/*/*.js'], ['js']);
    gulp.watch(['qwui/sass/*/*.scss', 'qwui/sass/*/*/*.scss'], ['style']);
    gulp.watch(['qwui/html/*.html', 'qwui/html/*/*.html'], ['html']);
});

gulp.task('prod', function() {

    gulp.watch(['qwui/js/*.js'], ['js']);
    gulp.watch(['qwui/sass/*/*.scss', 'qwui/sass/*/*/*.scss'], ['style']);
    gulp.watch(['qwui/html/*.html', 'qwui/html/*/*.html'], ['html']);
});
