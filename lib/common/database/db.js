/**
 * @file 排查工具server
 * @author li ang(liang07@baidu.com)
 */

import mongoose from 'mongoose';
import conf from './conf';

let hasConnect;

const connect = () => {
    if (hasConnect) {
        return;
    }

    mongoose.connect(conf.SERVER);

    const db = mongoose.connection;

    db.on('error', (e) => {
        console.log(e);
    });

    db.once('open', (callback) => {
        console.log('database connect');
    });

    hasConnect = true;
};

const database = {
    connect: connect
};

export default database;