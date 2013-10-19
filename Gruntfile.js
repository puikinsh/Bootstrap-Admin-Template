/* jshint node: true */
module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            '* <%=pkg.name %> by <%= pkg.author.email %>\n' +
            '* Version : <%= pkg.version %> \n' +
            '* Author : <%= pkg.author.name %> \n' +
            '* Copyright <%= grunt.template.today("yyyy") %>\n' +
            '*/\n',
        clean: {dist: ['dist']},
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false
            },
            main: {
                src: ['src/assets/js/app/*.js'],
                dest: 'dist/assets/js/main.js'
            },
            countdown: {
                src: ['src/assets/js/countdown.js'],
                dest: 'dist/assets/js/countdown.js'
            },
            styleSwitcher: {
                src: ['src/assets/js/style-switcher.js'],
                dest: 'dist/assets/js/style-switcher.js'
            },
            emberApp: {
                src: ['src/assets/js/app.js'],
                dest: 'dist/assets/js/app.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            main: {
                src: ['<%= concat.main.dest %>'],
                dest: 'dist/assets/js/main.min.js'
            }
        },
        jshint: {
            options: {
                jshintrc: 'src/assets/js/.jshintrc'
            },
            main: {
                src: ['src/assets/js/*.js']
            }
        },
        assemble: {
            // Task-level options
            options: {
                flattern: true,
                assets: 'dist/assets',
                data: 'src/data/*.{json,yml}',
                partials: ['src/templates/partials/**/*.hbs'],
                helpers: 'src/helper/**/*.js',
                layoutdir: 'src/templates/layouts'
            },
            pages: {
                // Target-level options
                options: {
                    layout: 'default.hbs'
                },
                files: [
                    {expand: true, cwd: 'src/templates/pages', src: ['*.hbs'], dest: 'dist/'}
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
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/assets/css',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/css'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/lib',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/img',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/img'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/submodule',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/less',
                        src: ['theme.less'],
                        dest: 'dist/assets/less'
                    },
                    {
                        expand: true,
                        cwd: 'src/ember',
                        src: ['*.html'],
                        dest: 'dist'
                    }
                ]
            }
        },

        watch: {
            scripts: {
                files: ['**/*.js', '**/*.less', '**/*.hbs', '**/*.html'],
                tasks: ['default']
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    
    //grunt.loadNpmTasks('grunt-recess');
    // remove grunt-recess modules. because not supported my code
    
    grunt.loadNpmTasks('assemble');

    // Test task.
    //grunt.registerTask('test', ['jshint', 'qunit']);

    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'jshint', 'uglify']);

    // CSS distribution task.
    //grunt.registerTask('dist-css', ['recess']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-js', 'copy']);

    // Default task.
    //grunt.registerTask('default', ['test', 'dist']);

    grunt.registerTask('default', ['dist', 'assemble']);

};
