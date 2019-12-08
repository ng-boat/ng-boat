var gulp = require('gulp'),
  config = require('../config'),
  gutil = require('gulp-util'),
  less = require('gulp-less'),
  environments = require('gulp-environments'),
  concat = require('gulp-concat');

var development = environments.development;
var production = environments.production;


gulp.task('less', ['clean'], function(){
  var compress = production()
  return gulp.src(config.paths.css.src)
    .pipe(less({
      compress: production()
    }))
    .pipe(gulp.dest(config.paths.temp))
});

var tasks = ['less'];
for (var key in config.paths.css.bundles){
  (function(key) {
    tasks.push('styles:'+key);
    gulp.task('styles:'+key, ['clean', 'less'], function() {
      var dest = production() ? config.paths.css.dest.production : config.paths.css.dest.development;
      return gulp.src(config.paths.css.bundles[key])
        .pipe(concat(key+'.css'))
        .pipe(gulp.dest(dest))
    });
  })(key);
}

gulp.task('styles', tasks);
