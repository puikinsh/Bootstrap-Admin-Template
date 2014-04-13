module.exports = {
    main: {
        options: {
            banner:'<%= banner %>',
            sourceMap: true,
            sourceMapName: 'dist/assets/js/main.js.map'
        },
        files: {
            'dist/assets/js/main.min.js': ['dist/assets/js/main.js']
        }
    },
    countdown: {
        options: {
            banner:'<%= banner %>',
            sourceMap: true,
            sourceMapName: 'dist/assets/js/countdown.js.map'
        },
        files: {
            'dist/assets/js/countdown.min.js': ['dist/assets/js/countdown.js']
        }
    },
    styleswitcher: {
        banner:'<%= banner %>',
        options: {
            sourceMap: true,
            sourceMapName: 'dist/assets/js/style-switcher.js.map'
        },
        files: {
            'dist/assets/js/style-switcher.min.js': ['dist/assets/js/style-switcher.js']
        }
    },
    validation: {
        files: [
            {
                'dist/assets/lib/jquery-validation/additional-methods.min.js': ['dist/assets/lib/jquery-validation/additional-methods.js'],
                'dist/assets/lib/jquery-validation/jquery.validate.min.js': ['dist/assets/lib/jquery-validation/jquery.validate.js']
            }
        ]
    }
}
