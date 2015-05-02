module.exports = {
  task: {

    // Point to the files that should be updated when
    // you run `grunt wiredep`
    src: [
    'dist/**/*.html',   // .html support...
    ],

    options: {
      // See wiredep's configuration documentation for the options
      // you may pass:

      // https://github.com/taptapship/wiredep#configuration
      devDependencies: true
    }
  }
};
