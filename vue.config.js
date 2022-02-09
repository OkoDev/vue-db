module.exports = {
    devServer: {
        proxy: {
            '^/api/': {
                target: 'http://vue-db/',
                changeOrigin: true, // so CORS doesn't bite us.
            }
        }
    }
}