module.exports = {
  options: {
    position: 'top',
    banner: '<%= banner %>',
    linebreak: true
  },
  css: {
    files: {
      src: ['dist/assets/css/*.css']
    }
  },
  js: {
    files: {
      src: ['dist/assets/js/*.js']
    }
  }
};
