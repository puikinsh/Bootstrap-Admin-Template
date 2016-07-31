'use strict';

var assemble = require('assemble');
var extname = require('gulp-extname');
var path = require('path');
var browserSync = require('browser-sync').create();
var helpers = require('handlebars-helpers');
var compare = helpers.comparison();
var pkg = require('./package');

var app = assemble();

app.task('init', function(cb) {
    app.helper('md', require('helper-md').sync);
    app.helper('is', compare);
    app.helper('markdown', require('helper-markdown'));
    app.data('pkg', pkg);
    app.data('dist', 'dist');
    app.data(['./src/templates/data/**/*.{json,yml}']);
    // app.data('analytic','UA-23581568-13');
    app.layouts(path.join(__dirname, './src/templates/layouts/*.hbs'));
    app.partials(path.join(__dirname, './src/templates/partials/**/*.hbs'));
    app.pages(path.join(__dirname, './src/templates/pages/*.hbs'));
    app.option('layout', 'default');
    cb();
});

app.task('html:rtl', ['init'], function() {
    app.data('assets', '../assets');
    app.data('rtl', true);
    return app.toStream('pages')
        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(app.dest('public/rtl'))
        .pipe(browserSync.stream());
});

app.task('html', ['init'], function() {
    app.data('assets', 'assets');
    return app.toStream('pages')
        .pipe(app.renderFile())
        .pipe(extname())
        .pipe(app.dest('public'))
        .pipe(browserSync.stream());
});

app.task('default', ['html', 'html:rtl']);

module.exports = app;
