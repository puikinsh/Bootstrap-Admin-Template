module.exports = {
    bsFiles: {
        src: [
            'public/*'
        ]
    },
    options: {
        server: {
            watchTask: true,
            baseDir: [
                'public',
                'dist'
            ]
        },
        routes: {
            "/dist": "dist"
        }
    }
};
