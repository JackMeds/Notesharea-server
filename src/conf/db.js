//redis链接配置
const { isProd } = require('../utils/env');

let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
};

if (isProd) {
    REDIS_CONF = {
        //线上的redis配置
        port: 6379,
        host: '127.0.0.1',
    };
}

let MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'sys_db',
}
if (isProd) {
    MYSQL_CONF = {
        //线上的mysql配置
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'sys_db',
    }
}
module.exports = {
    REDIS_CONF,
    MYSQL_CONF
};