/**
 * @file webpack配置
 * @author li ang(liang07@baidu.com)
 */

import {join} from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const conf = {
    entry: {
        app: join(__dirname, '../web/app.js')
    },
    output: {
        path: join(__dirname, '../web'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),

        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: join(__dirname, '../web/index.html'),
            inject: true
        })
    ]
};

export default conf;