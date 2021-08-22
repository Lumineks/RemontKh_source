let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin');
fileinclude = require('gulp-file-include');

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('style', function () {
    return gulp.src([
            'node_modules/normalize.css/normalize.css',
            'node_modules/swiper/swiper-bundle.css',  
            'node_modules/mm-jsr/dist/assets/css/main.css',          
            'node_modules/animate.css/animate.css',          
        ])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'))
        .pipe(gulp.dest('./build/css'))
});
gulp.task('script', function () {
    return gulp.src([
            'node_modules/swiper/swiper-bundle.js',
            'node_modules/smoothscroll-polyfill/dist/smoothscroll.js',
            'node_modules/mm-jsr/dist/main.js',
            'node_modules/wow.js/dist/wow.js',
                        
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('html', function () {
    return gulp.src(['app/*.html', '!app/parts/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('./build/images'));
});


gulp.task('js', function () {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "build/"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/**/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('images', 'html', 'fonts', 'style', 'script', 'sass', 'watch', 'browser-sync'))