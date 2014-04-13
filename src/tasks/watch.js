module.exports = {
    assemble: {
        files: ['src/templates/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
    },
    less: {
      files: ['src/templates/less/**/*.less'],
      tasks: ['copy:main','less']
    },
    script: {
      files: ['src/assets/js/**/*.js'],
      tasks: ['concat','uglify']
    },
    livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            'dist/{,*/}*.html',
            'dist/assets/{,*/}*.less',
            'dist/assets/{,*/}*.css'
        ]
    }
}