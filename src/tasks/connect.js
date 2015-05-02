module.exports = {
  options: {
    port: 9000,
    livereload: 35729,
    hostname: 'localhost',
    base: '<%= config.dest %>'
  },
  livereload: {
    options: {
      open: true
    }
  }
};
