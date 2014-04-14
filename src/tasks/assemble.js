module.exports = {
    // Task-level options
    options: {
        flatten: true,
        postprocess: require('pretty'),
        assets: '<%= config.assets %>',
        data: '<%= config.data %>',
        partials: ['<%= config.partials %>'],
        helpers: '<%= config.helpers %>',
        layoutdir: '<%= config.layoutdir %>'
    },
    main: {
        options: {
            layout: 'default.hbs'
        },
        files: [
            {
                expand: true,
                cwd: '<%= config.pages %>',
                src: ['*.hbs'],
                dest: '<%= config.dest %>'
            }
        ]
    },
    login: {
        options: {
            layout: 'login.hbs'
        },
        files: [
            {expand: true, cwd: 'src/templates/login', src: ['login.hbs'], dest: 'dist/'}
        ]
    },
    errors: {
        options: {
            layout: 'errors.hbs'
        },
        files: [
            {expand: true, cwd: 'src/templates/errors', src: ['*.hbs'], dest: 'dist/'}
        ]
    },
    countdown: {
        options: {
            layout: 'countdown.hbs'
        },
        files: [
            {expand: true, cwd: 'src/templates/countdown', src: ['*.hbs'], dest: 'dist/'}
        ]
    }
};