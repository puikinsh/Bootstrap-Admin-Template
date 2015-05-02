module.exports = {
  grunt: {
    options: {
      jshintrc: './.jshintrc'
    },
    src: ['Gruntfile.js', '<%= config.src %>/tasks/**/*.js']
  },
  main: {
    options: {
      jshintrc: '<%= config.src %>/assets/js/.jshintrc'
    },
    src: ['<%= config.src %>/assets/js/**/*.js']
  }
};
