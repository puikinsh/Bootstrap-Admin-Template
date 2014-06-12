module.exports = {
    core: {
        options: {
            banner: '<%= banner %>',
            sourceMap: true,
            sourceMapName: 'dist/assets/js/core.js.map'
        },
        files: {
            'dist/assets/js/core.min.js': ['dist/assets/js/core.js']
        }
    },
    app: {
        options: {
            banner: '<%= banner %>',
            sourceMap: true,
            sourceMapName: 'dist/assets/js/app.js.map'
        },
        files: {
            'dist/assets/js/app.min.js': ['dist/assets/js/app.js']
        }
    },
    countdown: {
        options: {
            banner: '<%= banner %>',
            sourceMap: true,
            sourceMapName: 'dist/assets/js/countdown.js.map'
        },
        files: {
            'dist/assets/js/countdown.min.js': ['dist/assets/js/countdown.js']
        }
    },
    styleswitcher: {
        banner: '<%= banner %>',
        options: {
            sourceMap: true,
            sourceMapName: 'dist/assets/js/style-switcher.js.map'
        },
        files: {
            'dist/assets/js/style-switcher.min.js': ['dist/assets/js/style-switcher.js']
        }
    }
};
