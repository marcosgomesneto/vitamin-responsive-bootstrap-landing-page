'use strict';
var gulp = require('gulp');
const browsersync = require("browser-sync").create();
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('gulp-webpack');


// BrowserSync
function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "./public/"
      },
      port: 3000
    });
    done();
}

// BrowserSync reload
function browserSyncReload(done) {
browsersync.reload();
done();
}

// CSS task
function css() {
    return gulp.src('./resources/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(cssnano())
      .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css/'))
};

function vendorCss() {
    return gulp.src('./resources/scss/vendor.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(cssnano())
      .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css/'))
};

// APP JS task
function appJs() {
    return gulp.src('./resources/js/app.js')
    .pipe(webpack({
        output: {
            filename: 'app.js',
        }    
    }))
    .pipe(gulp.dest('./public/js'));
};

function vendorJs() {
    return gulp.src('./resources/js/vendor.js')
    .pipe(webpack({
        output: {
            filename: 'vendor.js',
        }    
    }))
    .pipe(gulp.dest('./public/js'));
};

// Watch files
function watchFiles() {
    gulp.watch("./resources/scss/**/*", css);
    gulp.watch("./resources/js/**/*", appJs, vendorJs);
    gulp.watch("./public/**/*.html", browserSyncReload);
}

const build = gulp.series(vendorCss, css, appJs, vendorJs);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = build;