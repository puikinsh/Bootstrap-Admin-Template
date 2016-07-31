module.exports = {
  options: {
    paths: ['node_modules/bootstrap/less']
  },
  development: {
    files: {
      'dist/assets/css/main.css': ['src/assets/less/style.less']
    }
  },
  theme: {
    files: {
      'dist/assets/css/theme.css': ['src/assets/less/theme.less']
    }
  },
  production: {
    options: {
      compress: true
    },
    files: {
      'dist/assets/css/main.min.css': ['src/assets/less/style.less']
    }
  },
  switcher: {
    files: {
      'dist/assets/css/style-switcher.css': ['src/assets/less/style-switcher.less']
    }
  }
};
