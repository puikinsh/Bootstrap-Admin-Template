module.exports = {
  main: {
    files: [{
      'dist/assets/js/core.js': [
        'src/assets/js/ie10-viewport-bug-workaround.js',
        'src/assets/js/core/Metis.js',
        'src/assets/js/core/metisNavBar.js',
        'src/assets/js/core/fullscreen.js',
        'src/assets/js/core/metisAnimatePanel.js',
        'src/assets/js/core/init.js'
      ],
      'dist/assets/js/app.js': ['src/assets/js/app/*.js'],
      'dist/assets/js/countdown.js': ['src/assets/js/countdown.js'],
      'dist/assets/js/style-switcher.js': ['src/assets/js/style-switcher.js']
    }]
  }
};
