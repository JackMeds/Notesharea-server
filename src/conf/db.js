//redis链接配置
const { isProd } = require('../utils/env');

let REDIS_CONF = {
    port: 6379,
    host: '8.130.39.153',
};

if (isProd) {
    REDIS_CONF = {
        //线上的redis配置
        port: 6379,
        host: '8.130.39.153',
    };
}

let MYSQL_CONF = {
    host: '8.130.39.153',
    user: 'root',
    password: 'Hedaye123',
    port: '3306',
    database: 'notesharea_database',
}
if (isProd) {
    MYSQL_CONF = {
        //线上的mysql配置
        host: '8.130.39.153',
        user: 'root',
        password: 'Hedaye123',
        port: '3306',
        database: 'notesharea_database',
    }
}
module.exports = {
    REDIS_CONF,
    MYSQL_CONF
};