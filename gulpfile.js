'use strict'

// ---- includes
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');
const inject = require('gulp-inject');
const scss = require('postcss-scss');
const strip = require('gulp-strip-debug');

// ---- config
var config = {
  src: 'src',
	dist: 'dist'
};

// ---- browsersync
gulp.task('browserSync', function() {
  browserSync({
    ghostMode: false,
    server: {
      baseDir: 'dist'
    }
  })
});

// ---- watchers
gulp.task('watch', function() {
  gulp.watch(config.src + '/**/*.scss', ['css']);
  gulp.watch(config.src + '/**/*.html', ['index']);
  gulp.watch(config.src + '/**/*.js', ['js']);
});

// ---- tasks
gulp.task('sass', function() {
  return gulp.src(config.src + '/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss([ 
        autoprefixer({
          browsers: ['last 5 versions']
        })
    ], {syntax: scss}))
    .pipe(gulp.dest(config.src + '/css'))
    .pipe(browserSync.stream());
})

gulp.task('css', ['sass'], function() {
  return gulp.src(config.src + '/css/*.css')    
    .pipe(concatCss('bundle.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.dist + '/css/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(config.src + '/js/*.js')
    .pipe(strip())
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist + '/js/'))
    .pipe(browserSync.stream());
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})


// ---- bower inject
gulp.task('index', function() {
  var target = gulp.src(config.src + '/*.html');
  var sources = gulp.src(
    [config.dist + '/**/*.js', config.dist + '/**/*.css'], 
    {read: false}, 
    {relative: false}
  );
  return target
    .pipe(
      inject(sources, {
        ignorePath: config.dist, 
        addRootSlash: false
      })
    )
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream());
});

// ---- task commands
gulp.task('default', function(cb){
	runSequence('clean:dist', ['css', 'js'], 'index', cb);
});

gulp.task('dev', function(cb) {
  runSequence('default', ['browserSync'], 'watch', cb)
});