'use strict';
var gulp = require('gulp');
const browsersync = require("browser-sync").create();
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');
const merge = require("merge-stream");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('gulp-webpack');
var concat = require('gulp-concat');
const uglify = require('gulp-uglify');

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
      .pipe(minify())
      .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css/'))
};

function vendorCss() {
  // Bootstrap
  gulp.src('./node_modules/font-awesome/fonts/**/*')
  .pipe(gulp.dest('./public/css/fonts'));
  var fontAwesome = gulp.src('./node_modules/font-awesome/css/font-awesome.min.css').pipe(minify());
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(minify());
  var animateCss = gulp.src('./node_modules/animate.css/animate.min.css').pipe(minify());
  return merge(bootstrap, animateCss, fontAwesome)
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.css'))
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
        },
        plugins: [uglify],
    }))
    .pipe(gulp.dest('./public/js'));
};

// Watch files
function watchFiles() {
    gulp.watch("./resources/scss/**/*", css);
    gulp.watch("./resources/scss/vendor.scss", vendorCss);
    gulp.watch("./resources/js/app.js", appJs);
    gulp.watch("./resources/js/vendor.js", vendorJs);
    gulp.watch("./public/**/*.html", browserSyncReload);
}

const vendor = gulp.series(vendorCss);
const build = gulp.series(vendor, css, appJs, vendorJs);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

exports.vendor = vendor;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = build;