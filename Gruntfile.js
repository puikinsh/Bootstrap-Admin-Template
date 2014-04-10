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
                    'dist/assets/css/main.css': ['src/assets/less/style.less'],
                    'dist/assets/css/theme.css': ['src/assets/less/theme.less']
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
            lib: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/jquery.tablesorter/js',
                        src: ['./**/jquery.tablesorter.min.js'],
                        dest: 'dist/assets/lib/jquery.tablesorter'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/fullcalendar-1.6.4/fullcalendar',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/fullcalendar'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery.sparkline.min',
                        src: ['./**/*.js'],
                        dest: 'dist/assets/lib/jquery.sparkline.min'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/flot',
                        src: ['./jquery.flot.js', './jquery.flot.selection.js', './jquery.flot.resize.js', './jquery.flot.pie.js'],
                        dest: 'dist/assets/lib/flot'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/colorpicker',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/colorpicker'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/cssbeautify',
                        src: ['./*.js'],
                        dest: 'dist/assets/lib/cssbeautify'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/SubtlePatterns/',
                        src: ['./*.{png,jpg}'],
                        dest: 'dist/assets/img/pattern'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/validationEngine/',
                        src: ['./js/**/*.*', './css/**/*.*'],
                        dest: 'dist/assets/lib/validationEngine'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery-validation-1.12.0/',
                        src: ['./dist/jquery.validate.min.js', './src/localization/*.js'],
                        dest: 'dist/assets/lib/jquery-validation'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/epiceditor/epiceditor',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/epiceditor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-wysihtml5',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/wysihtml5'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/cleditor',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/cleditor'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/pagedown-bootstrap',
                        src: ['./*.js'],
                        dest: 'dist/assets/lib/pagedown-bootstrap'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jasny-bootstrap/dist/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/jasny-bootstrap'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/plupload/js',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/plupload'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery.uniform/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/jquery.uniform'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery.gritter/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/jquery.gritter'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery-form/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/jquery-form'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/formwizard/js/',
                        src: ['./jquery.form.wizard.js'],
                        dest: 'dist/assets/lib/formwizard'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/datatables/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/datatables'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/datatables-plugins/integration/bootstrap/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/datatables'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery-ui-touch-punch/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/jquery-ui-touch-punch'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/elfinder',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/elfinder'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/animate.css',
                        src: ['./animate.min.css'],
                        dest: 'dist/assets/lib/animate.css'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/kbwood_countdown/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/kbwood_countdown'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/magic',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/magic'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/chosen_v1.1.0/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/chosen'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jQuery.validVal/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/validVal'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery-inputlimiter/',
                        src: ['./jquery.inputlimiter.{js,css}'],
                        dest: 'dist/assets/lib/inputlimiter'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery.tagsinput',
                        src: ['./jquery.tagsinput.{js,css}'],
                        dest: 'dist/assets/lib/tagsinput'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-daterangepicker',
                        src: ['./daterangepicker*.{js,css}'],
                        dest: 'dist/assets/lib/daterangepicker'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/datepicker',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/datepicker'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-timepicker',
                        src: ['./css/**/*.*', './js/**/*.*'],
                        dest: 'dist/assets/lib/timepicker'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-switch/dist/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/switch'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/momentjs/min/',
                        src: ['./**/*.*'],
                        dest: 'dist/assets/lib/moment'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery-autosize/',
                        src: ['./**/*.js'],
                        dest: 'dist/assets/lib/autosize'
                    }
                ]
            },
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
                        src: ['less-1.6.3.min.js'],
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
