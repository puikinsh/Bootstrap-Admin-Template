module.exports = {
  options: {
    banner: '<%= banner %>',
    paths: ['bower_components/bootstrap/less']
  },
  development: {
    files: {
      'dist/assets/css/main.css': ['dist/assets/css/less/style.less'],
      'dist/assets/css/theme.css': ['dist/assets/css/less/theme.less']
    }
  },
  production: {
    options: {
      sourceMap: true,
      sourceMapBasepath: 'dist/assets/css/',
      sourceMapFilename: "dist/assets/css/main.css.map",
      compress: true
    },
    files: {
      'dist/assets/css/main.min.css': ['dist/assets/css/less/style.less']
    }
  },
  switcher: {
    files: {
      'dist/assets/css/style-switcher.css': ['dist/assets/css/less/style-switcher.less']
    }
  }
};
