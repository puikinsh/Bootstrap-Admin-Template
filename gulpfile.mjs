import path from "node:path";
import { fileURLToPath } from "node:url";
import { deleteAsync } from "del";

import { dest, parallel, series, src, watch } from "gulp";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";
import header from "gulp-header";
import size from "gulp-size";
import rename from "gulp-rename";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rtlcss from "gulp-rtlcss";
import GulpCleanCss from "gulp-clean-css";

import pkg from "./package.json" with { type: "json" };

import app from './assemblefile.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nmd = 'node_modules';
const vnd = 'public/assets/lib';

const banner = [
    "/**",
    " * <%= pkg.name %> - <%= pkg.description %>",
    " * @version <%= pkg.version %>",
    " * @license <%= pkg.license %>",
    " * @link <%= pkg.homepage %>",
    " */",
    "",
].join("\n");

function clean() {
    return deleteAsync(["dist", "public"]);
}


function css(cb) {
    cb();
    return src([
        "src/less/main.less",
        "src/less/style-switcher.less",
        "src/less/theme.less",
    ])
        .pipe(less({
            paths: [path.join(__dirname, "node_modules")],
        }))
        .pipe(autoprefixer())
        .pipe(header(banner, { pkg }))
        .pipe(dest("dist"))
        .pipe(dest("public/assets/css"))
        .pipe(GulpCleanCss())
        .pipe(rename({
            extname: ".min.css",
        }))
        .pipe(header(banner, { pkg }))
        .pipe(dest("dist"))
        .pipe(dest("public/assets/css"))
        .pipe(size({
            title: "styles:theme",
        }));
}

function cssrtl(cb) {
    cb();
    return src([
        "src/less/main.less",
        "src/less/style-switcher.less",
        "src/less/theme.less",
    ])
        .pipe(less({
            paths: [path.join(__dirname, "node_modules")],
        }))
        .pipe(rtlcss())
        .pipe(autoprefixer())
        .pipe(header(banner, { pkg }))
        .pipe(rename({
            suffix: ".rtl",
        }))
        .pipe(dest("dist"))
        .pipe(dest("public/assets/css"))
        .pipe(GulpCleanCss())
        .pipe(rename({
            extname: ".min.css",
        }))
        .pipe(header(banner, { pkg }))
        .pipe(dest("dist"))
        .pipe(dest("public/assets/css"))
        .pipe(size({
            title: "styles:rtl",
        }));
}

function bs3rtl(cb) {
    cb();
    return src('node_modules/bootstrap/less/bootstrap.less')
        .pipe(less())
        .pipe(rtlcss())
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: ".rtl",
        }))
        .pipe(dest("public/assets/lib/bootstrap/css"))
        .pipe(GulpCleanCss())
        .pipe(rename({
            extname: ".min.css",
        }))
        .pipe(dest("public/assets/lib/bootstrap/css"))
        .pipe(size({
            title: "styles:rtl",
        }));
}

function jscore() {
    return src([
        "src/js/core/Metis.js",
        "src/js/core/metisNavBar.js",
        "src/js/core/fullscreen.js",
        "src/js/core/metisAnimatePanel.js",
        "src/js/core/init.js",
    ])
        .pipe(concat("core.js"))
        .pipe(header(banner, { pkg }))
        .pipe(dest("dist"))
        .pipe(dest("public/assets/js"))
        .pipe(uglify())
        .pipe(header(banner, { pkg }))
        .pipe(rename({
            extname: ".min.js",
        }))
        .pipe(dest("dist"))
        .pipe(dest("public/assets/js"));
}

function jsapp() {
    return src("src/js/app/*.js")
        .pipe(concat("app.js"))
        .pipe(header(banner, { pkg }))
        .pipe(dest("dist"))
        .pipe(dest("public/assets/js"))
        .pipe(uglify())
        .pipe(header(banner, { pkg }))
        .pipe(rename({
            extname: ".min.js",
        }))
        .pipe(dest("dist"))
        .pipe(dest("public/assets/js"));
}

async function assets(){
    src(`${nmd}/jquery/dist/**/*.*`).pipe(dest(`${vnd}/jquery`));
    src(`${nmd}/jquery-ui/dist/**/*.*`).pipe(dest(`${vnd}/jquery-ui`));
    src(`${nmd}/bootstrap/dist/**/*.*`).pipe(dest(`${vnd}/bootstrap`));
    src(`${nmd}/animate.css/*.css`).pipe(dest(`${vnd}/animate.css`));
    src(`${nmd}/font-awesome/{css,fonts}/**/*.*`).pipe(dest(`${vnd}/font-awesome`));
    src(`${nmd}/moment/min/*.*`).pipe(dest(`${vnd}/moment`));
    src(`${nmd}/chart.js/dist/*.*`).pipe(dest(`${vnd}/chart.js`));
    src(`${nmd}/metismenu/dist/*.*`).pipe(dest(`${vnd}/metismenu`));
    src(`${nmd}/onoffcanvas/dist/*.*`).pipe(dest(`${vnd}/onoffcanvas`));
    src(`${nmd}/clipboard/dist/*.*`).pipe(dest(`${vnd}/clipboard`));
    src(`${nmd}/cleave.js/dist/**/*.*`).pipe(dest(`${vnd}/cleave.js`));
    src(`${nmd}/screenfull/dist/**/*.*`).pipe(dest(`${vnd}/screenfull`));
    src(`${nmd}/noty/lib/*.*`).pipe(dest(`${vnd}/noty`));
    src(`${nmd}/plupload/js/*.*`).pipe(dest(`${vnd}/plupload`));
    src(`${nmd}/formwizard/js/*.*`).pipe(dest(`${vnd}/formwizard`));
    src(`${nmd}/jquery-inputlimiter/*.*`).pipe(dest(`${vnd}/jquery-inputlimiter`));
    src(`${nmd}/jquery-validation/dist/**/*.*`).pipe(dest(`${vnd}/jquery-validation`));
    src(`${nmd}/gritter/**/*.*`).pipe(dest(`${vnd}/gritter`));
    src(`${nmd}/bootstrap-timepicker/**/*.*`).pipe(dest(`${vnd}/bootstrap-timepicker`));
    src(`${nmd}/daterangepicker/daterangepicker.*`).pipe(dest(`${vnd}/daterangepicker`));
    src(`${nmd}/gmaps/gmaps.{js,min.js}`).pipe(dest(`${vnd}/gmaps`));
    src(`${nmd}/fullcalendar/dist/**/*.*`).pipe(dest(`${vnd}/fullcalendar`));
    src(`${nmd}/bootstrap4-duallistbox/dist/**/*.*`).pipe(dest(`${vnd}/bootstrap4-duallistbox`));

    src('./src/css/*.css').pipe(dest('./public/assets/css'));
    src('./src/less/theme.less').pipe(dest('./public/assets/less'));
    src('./src/img/**/*.*').pipe(dest('./public/assets/img'));
    src('./src/js/*.js').pipe(dest('./public/assets/js'));
}

function assemblePages(){
    return app.build('html', function(err) {
        if (err) {
            console.error('ERROR', err);
        }
    });
}

// gulp watch function
function devWatch() {
    // Watch .less files
    watch("src/less/**/*.less", css, cssrtl);
    // Watch .js files
    watch("src/js/**/*.js", jscore, jsapp);
    // Watch html files
    watch("src/**/*.hbs", pages);
}

const js = parallel(jscore, jsapp);
const pages = parallel(assemblePages);
const rtl = parallel(cssrtl, bs3rtl);

const build = parallel(css, jscore, jsapp, assets, pages);

const dev = series(css, jscore, jsapp, rtl, devWatch);

export default build;

export { build, clean, assets, dev, css, rtl, js, pages };
