const path = require('path');
const gulp = require('gulp');
const brs = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const app = require('./assemblefile');
const pkg = require('./package.json');

const $ = gulpLoadPlugins();
const nmd = 'node_modules';
const vnd = 'public/assets/lib';
const browserSync = brs.create();
const reload = browserSync.reload;

const banner = ['/*!',
  ' * Metis - <%= pkg.description %>',
  ' * @version <%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' * @link <%= pkg.homepage %>',
  ' */',
  ''
].join('\n');

const AUTOPREFIXER_BROWSERS = [
  'last 1 major version',
  '>= 1%',
  'Chrome >= 45',
  'Firefox >= 38',
  'Edge >= 12',
  'Explorer >= 10',
  'iOS >= 9',
  'Safari >= 9',
  'Android >= 4.4',
  'Opera >= 30'
];


gulp.task('styles:theme', function () {
  return gulp.src(['src/less/theme*.less'])
    .pipe($.less({
      paths: [path.join(__dirname, './node_modules/bootstrap/less')]
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    .pipe($.header(banner, {
      pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.header(banner, {
      pkg
    }))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe($.size({
      title: 'styles:theme'
    }));
});

gulp.task('styles:switcher', function () {
  return gulp.src(['src/less/style-switcher.less'])
    .pipe($.less({
      paths: [path.join(__dirname, './node_modules/bootstrap/less')]
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    .pipe($.header(banner, {
      pkg
    }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.header(banner, {
      pkg
    }))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe($.size({
      title: 'styles:switcher'
    }));
});

gulp.task('styles', function () {
  return gulp.src('src/scss/style.scss')
    .pipe($.sass())
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    .pipe($.concat('main.css'))
    .pipe($.header(banner, {
      pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.concat('main.min.css'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe($.size({
      title: 'styles'
    }));
});


gulp.task('scripts:core', function () {
  return gulp.src([
      // 'src/assets/js/ie10-viewport-bug-workaround.js',
      'src/js/core/Metis.js',
      'src/js/core/metisNavBar.js',
      'src/js/core/fullscreen.js',
      'src/js/core/metisAnimatePanel.js',
      'src/js/core/init.js'
    ])
    .pipe($.babel())
    .pipe(gulp.dest('.tmp/app'))
    .pipe($.concat('core.js'))
    .pipe($.header(banner, {
      pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.concat('core.min.js'))
    .pipe($.header(banner, {
      pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe($.size({
      title: 'scripts:core'
    }));
});

gulp.task('scripts:app', function () {
  return gulp.src('src/js/app/*.js')
    .pipe($.babel())
    .pipe(gulp.dest('.tmp/app'))
    .pipe($.concat('app.js'))
    .pipe($.header(banner, {
      pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.concat('app.min.js'))
    .pipe($.header(banner, {
      pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe($.size({
      title: 'scripts:app'
    }));
});

gulp.task('scripts', ['scripts:core', 'scripts:app']);

gulp.task('assets', function () {
  gulp.src(`${nmd}/chart.js/dist/*.*`).pipe(gulp.dest(`${vnd}/chart.js`));
  gulp.src(`${nmd}/clipboard/dist/*.*`).pipe(gulp.dest(`${vnd}/clipboard`));
  gulp.src(`${nmd}/cleave.js/dist/**/*.*`).pipe(gulp.dest(`${vnd}/cleave.js`));
  gulp.src(`${nmd}/noty/js/noty/packaged/*.*`).pipe(gulp.dest(`${vnd}/noty`));
  gulp.src(`${nmd}/jquery-validation/dist/*.*`).pipe(gulp.dest(`${vnd}/jquery-validation`));
  gulp.src(`${nmd}/gmaps/gmaps.{js,min.js}`).pipe(gulp.dest(`${vnd}/gmaps`));
  gulp.src(`${nmd}/fullcalendar/dist/**/*.*`).pipe(gulp.dest(`${vnd}/fullcalendar`));


  gulp.src('./src/css/*.css').pipe(gulp.dest('./public/assets/css'));
  gulp.src('./src/less/theme.less').pipe(gulp.dest('./public/assets/less'));
  gulp.src('./src/img/**/*.*').pipe(gulp.dest('./public/assets/img'));
  gulp.src('./src/lib/**/*.*').pipe(gulp.dest('./public/assets/lib'));
  gulp.src('./src/js/*.js').pipe(gulp.dest('./public/assets/js'));
});

gulp.task('pages', function() {
  app.build('html', function(err) {
    if (err) {
      console.error('ERROR', err);
    }
  });
});

/**
 * Serves the landing page from 'public' directory.
 */
gulp.task('serve', function() {
  browserSync.init({
    notify: true,
    server: {
      baseDir: ['public']
    }
  });
  watch();
});


/**
 * Defines the list of resources to watch for changes.
 */
function watch() {
  gulp.watch(['src/templates/**/*.hbs'], ['pages', reload]);
  gulp.watch(['src/**/*.js'], ['scripts', reload]);
  gulp.watch(['src/**/*.{less,css}'], ['styles', reload]);
  gulp.watch(['src/**/*.{svg,png,jpg,gif}'], ['assets', reload]);
  gulp.watch(['package.json'], ['assets']);
}

gulp.task('default', ['pages', 'styles', 'scripts', 'assets']);
