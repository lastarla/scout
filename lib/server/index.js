/**
 * @file 排查工具server
 * @author li ang(liang07@baidu.com)
 */

import Koa from 'koa';
import http from 'http';
import convert from 'koa-convert';
import webpack from 'webpack';
import webpackConf from '../conf/webpack.conf';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import koaStatic from 'koa-static';
import {join} from 'path';
import db from '../common/database/db';

const run = () => {

    const compiler = webpack(webpackConf);
    const app = new Koa();

    app.use(convert(koaStatic(join(__dirname, '../web'))));

    app.use(convert(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConf.output.publicPath
    })));

    app.use(convert(webpackHotMiddleware(compiler)));

    const server = http.createServer(app.callback());

    server.listen(3001);

    server.on('error', (e) => {
        console.log(e);
    });

    server.on('listening', () => {
        const address = server.address();

        console.log('Listening at http://localhost:' + address.port);
    });

    // db.connect();
};

export default {
    run
};