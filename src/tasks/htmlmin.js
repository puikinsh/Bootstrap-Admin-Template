module.exports = {
  dist: { // Target
    options: { // Target options
      removeComments: true,
      collapseWhitespace: true
    },
    files: [{
      expand: true,
      cwd: 'dist/',
      src: '**/*.html',
      dest: 'dist/'
    }]
  }
};
