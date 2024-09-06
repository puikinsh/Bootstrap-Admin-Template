import path from "node:path";
import { fileURLToPath } from "node:url";
import { deleteAsync } from "del";

import { dest, parallel, series, src, watch } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
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

const sass = gulpSass(dartSass);

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

function iconCss(cb){
    cb();
    return src("src/scss/icons.scss").pipe(sass({
        includePaths: [path.join(__dirname, "./node_modules")],
        outputStyle: "expanded",
    })).pipe(dest("public/assets/css"));
}

function cssLtr(cb) {
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
            title: "styles",
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
            title: "bs3:rtl",
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
    src(`${nmd}/jquery/dist/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/jquery`));
    src(`${nmd}/jquery-ui/dist/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/jquery-ui`));
    src(`${nmd}/bootstrap/dist/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/bootstrap`));
    src(`${nmd}/animate.css/*.css`, { encoding: false }).pipe(dest(`${vnd}/animate.css`));
    src(`${nmd}/moment/min/*.*`, { encoding: false }).pipe(dest(`${vnd}/moment`));
    src(`${nmd}/chart.js/dist/*.*`, { encoding: false }).pipe(dest(`${vnd}/chart.js`));
    src(`${nmd}/metismenu/dist/*.*`, { encoding: false }).pipe(dest(`${vnd}/metismenu`));
    src(`${nmd}/onoffcanvas/dist/*.*`, { encoding: false }).pipe(dest(`${vnd}/onoffcanvas`));
    src(`${nmd}/clipboard/dist/*.*`, { encoding: false }).pipe(dest(`${vnd}/clipboard`));
    src(`${nmd}/cleave.js/dist/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/cleave.js`));
    src(`${nmd}/screenfull/dist/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/screenfull`));
    src(`${nmd}/noty/lib/*.*`, { encoding: false }).pipe(dest(`${vnd}/noty`));
    src(`${nmd}/plupload/js/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/plupload`));
    src(`${nmd}/formwizard/js/*.*`, { encoding: false }).pipe(dest(`${vnd}/formwizard`));
    src(`${nmd}/jquery-inputlimiter/*.*`, { encoding: false }).pipe(dest(`${vnd}/jquery-inputlimiter`));
    src(`${nmd}/jquery-validation/dist/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/jquery-validation`));
    src(`${nmd}/gritter/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/gritter`));
    src(`${nmd}/bootstrap-timepicker/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/bootstrap-timepicker`));
    src(`${nmd}/daterangepicker/daterangepicker.*`, { encoding: false }).pipe(dest(`${vnd}/daterangepicker`));
    src(`${nmd}/gmaps/gmaps.{js,min.js}`, { encoding: false }).pipe(dest(`${vnd}/gmaps`));
    src(`${nmd}/fullcalendar/dist/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/fullcalendar`));
    src(`${nmd}/pagedown-bootstrap/{css,js}/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/pagedown-bootstrap`));
    src(`${nmd}/bootstrap4-duallistbox/dist/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/bootstrap4-duallistbox`));
    src(`${nmd}/bootstrap3-wysihtml5-bower/dist/**/*.*`, { encoding: false }).pipe(dest(`${vnd}/bootstrap3-wysihtml5-bower`));

    src(`${nmd}/bootstrap-icons/font/fonts/**/*.*`, { encoding: false }).pipe(dest(`public/assets/webfonts`));
    src(`${nmd}/@fortawesome/fontawesome-free/webfonts/**/*.*`, { encoding: false }).pipe(dest(`public/assets/webfonts`));

    src('./src/css/*.css', { encoding: false }).pipe(dest('./public/assets/css'));
    src('./src/less/theme.less', { encoding: false }).pipe(dest('./public/assets/less'));
    src('./src/img/**/*.*', { encoding: false }).pipe(dest('./public/assets/img'));
    src('./src/js/*.js', { encoding: false }).pipe(dest('./public/assets/js'));
}

// gulp watch function
function devWatch() {
    // Watch .less files
    watch("src/less/**/*.less", css, cssrtl);
    // Watch .js files
    watch("src/js/**/*.js", jscore, jsapp);
}

const js = parallel(jscore, jsapp);
const icons = parallel(iconCss);
const css = parallel(cssLtr, icons);
const rtl = parallel(cssrtl, bs3rtl, icons);

const build = parallel(css, js, assets);

const dev = series(css, js, rtl, devWatch);

export default build;

export { build, clean, assets, dev, css, rtl, js, icons };
