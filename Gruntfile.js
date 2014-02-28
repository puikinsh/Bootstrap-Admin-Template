/* jshint node: true */
module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            '* Metis - <%=pkg.name %> v<%= pkg.version %>\n' +
            '* Author : <%= pkg.author.name %> \n' +
            '* Copyright <%= grunt.template.today("yyyy") %>\n' +
            '* Licensed under <%= pkg.licenses %>\n' +
            '*/\n',
        clean: {dist: ['dist']},
        less: {
            options: {
		banner: '<%= banner %>',
                metadata: 'src/*.{json,yml}',
// 		sourceMap: true,
//              sourceMapFilename: "dist/assets/css/style.css.map",
//              sourceMapURL: 'style.css.map',
                paths: 'bower_components/bootstrap/less',
                imports: {
                    reference: ['mixins.less', 'variables.less']
                }
            },
            development: {
                files: {
                    'dist/assets/css/main.css': ['src/assets/less/style.less']
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/assets/css/main.min.css': ['src/assets/less/style.less']
                }
            }
        },
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
                flatten: true,
                postprocess: require('pretty'),
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
                        cwd: 'src/ember',
                        src: ['*.html'],
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/assemble-less/node_modules/less/dist/',
                        src: ['less-1.7.0.min.js'],
                        dest: 'dist/assets/lib'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist',
                        src: ['./**/jquery*.min.*'],
                        dest: 'dist/assets/lib'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/bootstrap'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: ['./css/*.*', './fonts/*.*'],
                        dest: 'dist/assets/lib/Font-Awesome'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/gmaps/',
                        src: ['./**/gmaps.js'],
                        dest: 'dist/assets/lib/gmaps'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/html5shiv/dist',
                        src: ['./html5shiv.js'],
                        dest: 'dist/assets/lib/html5shiv'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/respond/dest',
                        src: ['./respond.min.js'],
                        dest: 'dist/assets/lib/respond'
                    },
		     {
                        expand: true,
                        cwd: 'src/assets/less',
                        src: ['./**/theme.less'],
                        dest: 'dist/assets/less'
                    },
		     {
		       expand: true,
		     cwd: 'node_modules/epiceditor/epiceditor',
		     src: ['./**/*.*'],
		     dest: 'dist/assets/lib/epiceditor'
		    },
                     {
                       expand: true,
                     cwd: 'node_modules/screenfull/dist/',
                     src: ['./**/*.*'],
                     dest: 'dist/assets/lib/screenfull/'
                    }
                ]
            }
        },

        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['dist-js']
            },
            css: {
                files: ['**/*.css'],
                tasks: ['copy']
            },
            assemble: {
                files: ['**/*.hbs', '**/*.html'],
                tasks: ['assemble']
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
    grunt.loadNpmTasks('assemble-less');


    //grunt.loadNpmTasks('grunt-recess');
    // remove grunt-recess modules. because not supported my code

    grunt.loadNpmTasks('assemble');

    // Test task.
    //grunt.registerTask('test', ['jshint', 'qunit']);

    // JS distribution task.
    grunt.registerTask('dist-js', ['concat', 'jshint', 'uglify']);

    
    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'copy', 'less', 'dist-js']);

    // Default task.
    //grunt.registerTask('default', ['test', 'dist']);

    grunt.registerTask('default', ['dist', 'assemble']);

};
