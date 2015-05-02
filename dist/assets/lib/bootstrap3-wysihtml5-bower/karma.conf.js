// Karma configuration
// Generated on Thu Jun 26 2014 23:11:33 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],
    plugins: ['karma-qunit', 
              'karma-chrome-launcher'],

    // list of files / patterns to load in the browser
    files: [
      // Bower deps
      {pattern: 'components/wysihtml5x/dist/wysihtml5x-toolbar.js', watched: false, included: true, served: true}, 
      {pattern: 'components/jquery/dist/jquery.js', watched: false, included: true, served: true}, 
      {pattern: 'components/bootstrap/dist/js/bootstrap.min.js', watched: false, included: true, served: true},
      {pattern: 'components/handlebars/handlebars.runtime.min.js', watched: false, included: true, served: true},

      // Node deps
      {pattern: 'node_modules/qunitjs/qunit/qunit.js', watched: false, included: true, served: true},
      {pattern: 'node_modules/happen/happen.js', watched: false, included: true, served: true},
      {pattern: 'node_modules/qunit-assert-html/dist/qunit-assert-html.js', watched: false, included: true, served: true},

      // Source
      {pattern: 'src/generated/templates.js', watched: true, included: true, served: true},
      {pattern: 'src/bootstrap3-wysihtml5.js', watched: true, included: true, served: true},
      {pattern: 'src/locales/bootstrap-wysihtml5.en-US.js', watched: true, included: true, served: true},
      {pattern: 'src/generated/commands.js', watched: true, included: true, served: true},

      //CSS
      {pattern: 'components/bootstrap/dist/css/*.min.css', watched: false, included: true, served: true},
      {pattern: 'components/bootstrap/dist/fonts/*', watched: false, included: false, served: true},
      {pattern: 'src/*.css', watched: false, included: true, served: true},

      // Test helpers
      {pattern: 'test/testhelper.js', watched: true, included: true, served: true},
      {pattern: 'test/karma/test-main.js', watched: true, included: true, served: true},

      // Tests
      {pattern: 'test/**/*test.js', watched: true, included: true, served: true}
    ],


    // list of files to exclude or ignored tests
    exclude: [
      //small doesn't work at the moment. see https://github.com/Edicy/wysihtml5/issues/59
      'test/bs/bootstrap_editor_commands_test.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
