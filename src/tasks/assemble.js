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
            layout: 'default.hbs',
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
        {expand: true, cwd: 'src/templates/login', src: ['login.hbs'], dest: '<%= config.dest %>'}
        ]
    },
    errors: {
        options: {
            layout: 'errors.hbs'
        },
        files: [
        {expand: true, cwd: 'src/templates/errors', src: ['*.hbs'], dest: '<%= config.dest %>'}
        ]
    },
    countdown: {
        options: {
            layout: 'countdown.hbs'
        },
        files: [
        {expand: true, cwd: 'src/templates/countdown', src: ['*.hbs'], dest: '<%= config.dest %>'}
        ]
    },
    mainrtl: {
      options: {
        layout: 'default.hbs',
        rtl: true
      },
      files: [
      {
        expand: true,
        cwd: '<%= config.pages %>',
        src: ['*.hbs'],
        dest: '<%= config.dest %>/rtl'
      }
      ]
    },
    loginrtl: {
      options: {
        layout: 'login.hbs',
        rtl: true
      },
      files: [
      {expand: true, cwd: 'src/templates/login', src: ['login.hbs'], dest: '<%= config.dest %>/rtl'}
      ]
    },
    errorsrtl: {
      options: {
        layout: 'errors.hbs',
        rtl: true
      },
      files: [
      {expand: true, cwd: 'src/templates/errors', src: ['*.hbs'], dest: '<%= config.dest %>/rtl'}
      ]
    },
    countdownrtl: {
      options: {
        layout: 'countdown.hbs',
        rtl: true
      },
      files: [
      {expand: true, cwd: 'src/templates/countdown', src: ['*.hbs'], dest: '<%= config.dest %>/rtl'}
      ]
    }
};