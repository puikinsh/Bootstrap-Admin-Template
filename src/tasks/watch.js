module.exports = {
  assemble: {
    files: ['src/templates/{,*/}*.{md,hbs,yml}'],
    tasks: ['assemble']
  },
  less: {
    files: ['src/assets/less/**/*.less'],
    tasks: ['copy:main', 'less','usebanner:css']
  },
  script: {
    files: ['src/assets/js/**/*.js'],
    tasks: ['concat', 'uglify', 'usebanner:js']
  },
  grunt: {
    files: ['Gruntfile.js', 'src/tasks/*.js'],
    tasks: ['concat', 'uglify']
  },
  readme: {
    files: ['README.md'],
    tasks: ['assemble']
  },
  livereload: {
    options: {
      livereload: '<%= connect.options.livereload %>'
    },
    files: [
      'dist/{,*/}*.html',
      'dist/assets/{,*/}*.less',
      'dist/assets/{,*/}*.css',
      'dist/assets/{,*/}*.js'
    ]
  }
};
