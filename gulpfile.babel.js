import path from 'path';
import gulp from 'gulp';
import del from 'del';
import brs from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import app from './assemblefile';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const nmd = 'node_modules';
const vnd = 'public/assets/lib';
const browserSync = brs.create();
const reload = browserSync.reload;

const banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version <%= pkg.version %>',
    ' * @license <%= pkg.license %>',
    ' * @link <%= pkg.homepage %>',
    ' */',
    ''
].join('\n');

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Clean Output Directory
gulp.task('clean', () => del(['dist', 'public']));

gulp.task('styles:theme', () => {
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

gulp.task('styles:switcher', () => {
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

gulp.task('styles', ['styles:theme', 'styles:switcher'], () => {
    return gulp.src('src/less/style.less')
        .pipe($.less({
            paths: [path.join(__dirname, './node_modules/bootstrap/less')]
        }))
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
        .pipe($.header(banner, {
            pkg
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('public/assets/css'))
        .pipe($.size({
            title: 'styles'
        }));
});


gulp.task('scripts:core', () => {
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

gulp.task('scripts:app', () => {
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

gulp.task('assets', () => {
    gulp.src(`${nmd}/jquery/dist/**/*.*`).pipe(gulp.dest(`${vnd}/jquery`));
    gulp.src(`${nmd}/bootstrap/dist/**/*.*`).pipe(gulp.dest(`${vnd}/bootstrap`));
    gulp.src(`${nmd}/animate.css/*.css`).pipe(gulp.dest(`${vnd}/animate.css`));
    gulp.src(`${nmd}/font-awesome/{css,fonts}/**/*.*`).pipe(gulp.dest(`${vnd}/font-awesome`));
    gulp.src(`${nmd}/moment/min/*.*`).pipe(gulp.dest(`${vnd}/moment`));
    gulp.src(`${nmd}/chart.js/dist/*.*`).pipe(gulp.dest(`${vnd}/chart.js`));
    gulp.src(`${nmd}/metismenu/dist/*.*`).pipe(gulp.dest(`${vnd}/metismenu`));
    gulp.src(`${nmd}/onoffcanvas/dist/*.*`).pipe(gulp.dest(`${vnd}/onoffcanvas`));
    gulp.src(`${nmd}/clipboard/dist/*.*`).pipe(gulp.dest(`${vnd}/clipboard`));
    gulp.src(`${nmd}/cleave.js/dist/**/*.*`).pipe(gulp.dest(`${vnd}/cleave.js`));
    gulp.src(`${nmd}/screenfull/dist/**/*.*`).pipe(gulp.dest(`${vnd}/screenfull`));
    gulp.src(`${nmd}/noty/js/noty/packaged/*.*`).pipe(gulp.dest(`${vnd}/noty`));
    gulp.src(`${nmd}/jquery-validation/dist/*.*`).pipe(gulp.dest(`${vnd}/jquery-validation`));
    gulp.src(`${nmd}/gmaps/gmaps.{js,min.js}`).pipe(gulp.dest(`${vnd}/gmaps`));
    gulp.src(`${nmd}/fullcalendar/dist/**/*.*`).pipe(gulp.dest(`${vnd}/fullcalendar`));
    gulp.src('bower_components/bootstrap-duallistbox/dist/*.*').pipe(gulp.dest(`${vnd}/bootstrap-duallistbox`));


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
 * Serves the landing page from "public" directory.
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
    gulp.watch(['package.json', 'bower.json'], ['assets']);
}

gulp.task('default', ['pages', 'styles', 'scripts', 'assets']);
