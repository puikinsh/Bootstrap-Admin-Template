module.exports = {
    grunt: {
        options: {
            jshintrc: './.jshintrc',
            reporterOutput: ''
        },
        src: ['./Gruntfile.js', './src/tasks/**/*.js']
    },
    main: {
        options: {
            jshintrc: './src/assets/js/.jshintrc',
            reporterOutput: ''
        },
        src: ['./src/assets/js/**/*.js']
    }
};
