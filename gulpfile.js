'use strict';

var browserify = require('browserify'),
    del         = require('del'),
    source      = require('vinyl-source-stream'),
    vinylPaths  = require('vinyl-paths'),
    glob        = require('glob'),
    Server      = require('karma').Server,
    liveReload  = require('gulp-livereload'),
    gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    sourceMaps  = require('gulp-sourcemaps'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify'),
    buffer      = require('vinyl-buffer'),
    merge = require('merge'),
    watchify = require('watchify');

// Load all gulp plugins listed in package.json
var gulpPlugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

// Define file path variables
var paths = {
  root: './app/',
  src:  './app/js/',
  dist: './app/dist/',
  test: './test/'
};

var config = {
  js: {
    src: './app/js/app.js',
    outputDir: './app/dist/',
    mapDir: './maps/',
    outputFile: './bundle.js'
  }
};

var cssDest  = './app/css/',
  sassSrc  = './app/css/app.scss',
  sassGlob = './app/css/**/*.scss';

// var liveReload = true;

gulp.task('compile:css', function(){
  return gulp
    .src(sassSrc)
    .pipe(sourceMaps.init())
    // .pipe(sass().on('error', sass.logError))
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(cssDest));
});

gulp.task('clean', function () {
  return gulp
  .src([paths.root + 'ngAnnotate', paths.dist], {read: false})
  .pipe(vinylPaths(del));
});

gulp.task('lint', function () {
  return gulp
  .src(['gulpfile.js',
      paths.src + '**/*.js',
      paths.test + '**/*.js',
      '!' + paths.src + 'third-party/**',
      '!' + paths.test + 'browserified/**',
  ])
  .pipe(gulpPlugins.eslint())
  .pipe(gulpPlugins.eslint.format());
});

gulp.task('unit', function () {
  return gulp.src([
    paths.test + 'unit/**/*.js'
  ])
  .pipe(gulpPlugins.mocha({reporter: 'dot'}));
});

gulp.task('browserify', /*['lint', 'unit'],*/ function () {
  return browserify(paths.src + 'app.js', {debug: true})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(paths.dist))
  .pipe(gulpPlugins.connect.reload());
});

gulp.task('ngAnnotate', ['lint', 'unit'], function () {
  return gulp.src([
      paths.src + '**/*.js',
      '!' + paths.src + 'third-party/**',
  ])
  .pipe(gulpPlugins.ngAnnotate())
  .pipe(gulp.dest(paths.root + 'ngAnnotate'));
});

gulp.task('browserify-min', ['ngAnnotate'], function () {
  return browserify(paths.root + 'ngAnnotate/app.js')
  .bundle()
  .pipe(source('app.min.js'))
  .pipe(gulpPlugins.streamify(gulpPlugins.uglify({mangle: false})))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('browserify-tests', function () {
  var bundler = browserify({debug: true});
  glob
  .sync(paths.test + 'unit/**/*.js')
  .forEach(function (file) {
    bundler.add(file);
  });
  return bundler
  .bundle()
  .pipe(source('browserified_tests.js'))
  .pipe(gulp.dest(paths.test + 'browserified'));
});

gulp.task('karma', ['browserify-tests'], function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('server', ['browserify'], function () {
  gulpPlugins.connect.server({
    root: 'app'
    // livereload: liveReload
  });
});

gulp.task('e2e', ['server'], function () {
  return gulp.src([paths.test + 'e2e/**/*.js'])
  .pipe(gulpPlugins.protractor.protractor({
    configFile: 'protractor.conf.js',
    args: ['--baseUrl', 'http://127.0.0.1:8080'],
  }))
  .on('error', function (e) {
    throw e;
  })
  .on('end', function () {
    gulpPlugins.connect.serverClose();
  });
});

gulp.task('watch', ['bundle'], /*['fast'],*/ function () {
  gulp.start('server');
  gulp.watch(sassGlob, ['compile:css']);
  gulp.watch([
    paths.src + '**/*.js',
    '!' + paths.src + 'third-party/**',
    paths.test + '**/*.js',
  ]);
});

gulp.task('fast', /* ['clean'], */ function () {
  gulp.start('browserify');
});

gulp.task('testit', ['clean'], function () {
  // liveReload = false;
  gulp.start('karma', 'browserify', 'browserify-min', 'e2e');
});



function bundle (bundler) { 
  bundler
    .bundle()
    .pipe(source(config.js.src))
    .pipe(buffer())
    .pipe(rename(config.js.outputFile))
    .pipe(sourceMaps.init({ loadMaps : true }))
    .pipe(sourceMaps.write(config.js.mapDir))
    .pipe(gulp.dest(config.js.outputDir))
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    }))
    .pipe(liveReload());
}

// gulp.task('bundle', function () {
//   var bundler = browserify(config.js.src);
//   bundle(bundler);
// });


gulp.task('bundle', function(){
  
  liveReload(); // Start livereload server
  var args = merge(watchify.args, { debug: true });
  var bundler = browserify(config.js.src, args)
    .plugin(watchify, {ignoreWatch: [
      '**/node_modules/**',
      '**/bower_components/**'
    ]});

  bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)

  bundler.on('update', function() {
    bundle(bundler); // Re-run bundle on source updates
  });

});
