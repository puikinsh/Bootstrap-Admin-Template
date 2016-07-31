module.exports = {
  dist: {
    // [REQUIRED] Path to the build you're using for development.
    "devFile": "node_modules/grunt-modernizr/lib/modernizr-dev.js",

    // [REQUIRED] Path to save out the built file.
    "outputFile": "public/lib/modernizr/modernizr.min.js",

    // Based on default settings on http://modernizr.com/download/
    "extra": {
      "shiv": false,
      "printshiv": false,
      "load": true,
      "mq": false,
      "cssclasses": true
    },

    // Based on default settings on http://modernizr.com/download/
    "extensibility": {
      "addtest": true,
      "prefixed": true,
      "teststyles": true,
      "testprops": true,
      "testallprops": true,
      "hasevents": false,
      "prefixes": true,
      "domprefixes": true,
      "inputtypes": true
    },

    // By default, source is uglified before saving
    "uglify": false,

    // Define any tests you want to implicitly include.
    "tests": [
      'inputtypes',
      'touch',
      'fullscreen_api',
      'localstorage'
    ],

    // By default, this task will crawl your project for references to Modernizr tests.
    // Set to false to disable.
    "parseFiles": true,

    // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
    // You can override this by defining a "files" array below.
    // "files" : {
    // "src": []
    // },

    // When parseFiles = true, matchCommunityTests = true will attempt to
    // match user-contributed tests.
    "matchCommunityTests": false,

    // Have custom Modernizr tests? Add paths to their location here.
    "customTests": []
  }
};
