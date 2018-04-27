'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    rimraf = require('rimraf'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        images: 'build/images/',
        fonts: 'build/fonts/',
        vendor: 'build/vendor/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/css/*.css',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        vendor: 'src/vendor/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.css',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*',
        vendor: 'src/vendor/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: './build'
    },
    tunnel: true,
    host: 'localhost',
    port: 9000
    // logPrefix: 'Front Devil'
};

gulp.task('html:build', function () {
   gulp.src(path.src.html)
       .pipe(rigger())
       .pipe(gulp.dest(path.build.html))
       .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
   gulp.src(path.src.js)
    .pipe(rigger())
       .pipe(sourcemaps.init())
       .pipe(uglify())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest(path.build.js))
       .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('images:build', function () {
   gulp.src(path.src.images)
       .pipe(gulp.dest(path.build.images))
});

gulp.task('fonts:build', function () {
   gulp.src(path.src.fonts)
       .pipe(gulp.dest(path.build.fonts))
});

gulp.task('vendor:build', function () {
    gulp.src(path.src.vendor)
        .pipe(gulp.dest(path.build.vendor))
});

gulp.task('build', [
   'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'images:build',
    'vendor:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.images], function(event, cb) {
        gulp.start('images:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);