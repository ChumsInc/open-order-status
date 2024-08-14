import {merge} from 'webpack-merge';
import common from './webpack.common.mjs';
import path from 'node:path';

const localProxy = {
    target: 'http://localhost:8081',
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

const dirname = process.cwd();

export default merge(common, {
    mode: 'development',
    devServer: {
        static: [{
            directory: path.join(dirname, 'public'),
            watch: false,
        }, {
            directory: path.join(dirname, 'node_modules'),
            publicPath: '/node_modules',
            watch: false,
        }, {
            directory: path.join(dirname, ''),
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
                cwd: path.join(dirname, '/')
            }
        },
    },
    devtool: 'inline-source-map',
    plugins: []
});
