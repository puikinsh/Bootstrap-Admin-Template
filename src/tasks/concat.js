module.exports = {
    main: {
        options: {
            banner: '<%= banner %>',
            stripBanners: false
        },
        files: [
            {
                'dist/assets/js/main.js': ['src/assets/js/app/*.js'],
                'dist/assets/js/countdown.js': ['src/assets/js/countdown.js'],
                'dist/assets/js/style-switcher.js': ['src/assets/js/style-switcher.js']
            }
        ]
    }
};