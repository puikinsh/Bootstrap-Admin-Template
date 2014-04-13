module.exports = {
    options: {
        banner: '<%= banner %>',
        metadata: 'src/*.{json,yml}',
        paths: 'bower_components/bootstrap/less',
        imports: {
            reference: ['mixins.less', 'variables.less']
        }
    },
    development: {
        files: {
            'dist/assets/css/main.css': ['dist/assets/css/less/style.less'],
            'dist/assets/css/theme.css': ['dist/assets/css/less/theme.less']
        }
    },
    production: {
        options: {
            sourceMap: true,
            sourceMapBasepath:'dist/assets/css/',
            sourceMapFilename: "dist/assets/css/main.css.map",
            compress: true
        },
        files: {
            'dist/assets/css/main.min.css': ['dist/assets/css/less/style.less']
        }
    }
}