module.exports = {
    main: {
        files: [
            {
                expand: true,
                cwd: 'src/assets/less',
                src: ['./**/*.less'],
                dest: 'dist/assets/css/less'
            },
            {
                expand: true,
                cwd: 'bower_components/bootstrap/less',
                src: [
                    './mixins.less',
                    './variables.less'
                ],
                dest: 'dist/assets/css/less'
            },
            {
                expand: true,
                cwd: 'src/assets/css',
                src: ['./**/*.*'],
                dest: 'dist/assets/css'
            },
            {
                expand: true,
                cwd: 'src/assets/img',
                src: ['./**/*.*'],
                dest: 'dist/assets/img'
            }
        ]
    },
    lib: {
        files: [
            {
                expand: true,
                cwd: 'bower_components/jquery/dist',
                src: ['./**/*.*'],
                dest: 'dist/assets/lib/jquery'
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
                dest: 'dist/assets/lib/font-awesome'
            },
            {
                'dist/assets/lib/less/less-1.7.3.min.js': ['node_modules/less/dist/less-1.7.3.min.js'],
                'dist/assets/lib/gmaps/gmaps.js': ['bower_components/gmaps/gmaps.js'],
                'dist/assets/lib/html5shiv/html5shiv.js': ['bower_components/html5shiv/dist/html5shiv.js'],
                'dist/assets/lib/respond/respond.min.js': ['bower_components/respond/dest/respond.min.js'],
                'dist/assets/lib/jquery.tablesorter/jquery.tablesorter.min.js': ['bower_components/jquery.tablesorter/js/jquery.tablesorter.min.js'],
                'dist/assets/lib/jquery.sparkline/jquery.sparkline.min.js': ['bower_components/jquery.sparkline.min/index.js'],
                'dist/assets/lib/holderjs/holder.js': ['bower_components/holderjs/holder.js'],
                'dist/assets/lib/moment/moment.min.js': ['bower_components/moment/min/moment.min.js']
            },
            {
                expand: true,
                cwd: 'bower_components/jquery-validation',
                src: [
                    './dist/*.js',
                    './src/localization/*.js'
                ],
                dest: 'dist/assets/lib/jquery-validation'
            },
            {
                expand: true,
                cwd: 'bower_components/fullcalendar/dist',
                src: ['./**/*.{js,css}'],
                dest: 'dist/assets/lib/fullcalendar'
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
                src: ['./**/*.{css,js,png}'],
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
                src: [
                    'brillant.png',
                    'always_grey.png',
                    'retina_wood.png',
                    'low_contrast_linen.png',
                    'egg_shell.png',
                    'cartographer.png',
                    'batthern.png',
                    'noisy_grid.png',
                    'diamond_upholstery.png',
                    'greyfloral.png',
                    'white_tiles.png',
                    'gplaypattern.png',
                    'arches.png',
                    'purty_wood.png',
                    'diagonal_striped_brick.png',
                    'large_leather.png',
                    'bo_play_pattern.png',
                    'irongrip.png',
                    'wood_1.png',
                    'pool_table.png',
                    'crissXcross.png',
                    'rip_jobs.png',
                    'random_grey_variations.png',
                    'carbon_fibre.png'
                ],
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
                cwd: 'node_modules/epiceditor/epiceditor',
                src: ['./**/*.*'],
                dest: 'dist/assets/lib/epiceditor'
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
                src: ['./*.js', './themes/**/*.*'],
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
                'dist/assets/lib/datatables/jquery.dataTables.js': ['bower_components/datatables/media/js/jquery.dataTables.js']
            },
            {
                expand: true,
                cwd: 'bower_components/datatables-plugins/integration/bootstrap/',
                src: ['./{3,images}/*.*'],
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
                cwd: 'bower_components/chosen/',
                src: ['./*.{css,png}', './*.*jquery*.js'],
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
                src: ['./**/*.{css,js}'],
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
            },
            {
                expand: true,
                cwd: 'bower_components/jasny-bootstrap/dist/',
                src: ['./**/*.*'],
                dest: 'dist/assets/lib/jasny-bootstrap'
            },
            {
                expand: true,
                cwd: 'bower_components/bootstrap3-wysihtml5-bower/dist/',
                src: ['./**/*.*'],
                dest: 'dist/assets/lib/bootstrap3-wysihtml5-bower'
            },
            {
                expand: true,
                cwd: 'bower_components/pagedown-bootstrap',
                src: ['./{css,js}/*.{css,js}'],
                dest: 'dist/assets/lib/pagedown-bootstrap'
            },
            {
                expand: true,
                cwd: 'node_modules/epiceditor/epiceditor/',
                src: ['./**/*.*'],
                dest: 'dist/assets/lib/epiceditor'
            },
            {
                expand: true,
                cwd: 'bower_components/ckeditor',
                src: ['./**/*.*'],
                dest: 'dist/assets/lib/ckeditor'
            },
            {
                expand: true,
                cwd: 'node_modules/screenfull/dist/',
                src: ['./**/*.*'],
                dest: 'dist/assets/lib/screenfull/'
            }
        ]
    }
};