const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('node:path')

const localProxy = {
    target: 'http://localhost:8081',
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: [{
            directory: path.join(__dirname, 'public'),
            watch: false,
        }, {
            directory: path.join(__dirname, 'node_modules'),
            publicPath: '/node_modules',
            watch: false,
        }, {
            directory: path.join(__dirname, ''),
            publicPath: '/',
            watch: false,
        }],
        hot: true,
        proxy: [
            {context: ['/api', '/node-sage', '/version'], ...localProxy}
        ],
        watchFiles: {
            paths: 'src/**/*',
            options: {
                cwd: path.join(__dirname, '/')
            }
        },
    },
    devtool: 'inline-source-map',
    plugins: []
});
