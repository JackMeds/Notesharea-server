/**
 * @description sequelize 实例
 */
const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isProd, isTest } = require('../utils/env');

const { host, user, password, database } = MYSQL_CONF;
const conf = {
    host,
    dialect: 'mysql',
    timezone: '+08:00' //东八时区
}

if (isTest) {
    conf.logging = () => {}
}

if (isProd) {
    conf.pool = {
        max: 5, // 连接池中最大的连接数量
        min: 0, // 最小
        idle: 10000, // 如果一个连接池 10 s 之内没有被使用，则释放
    }
}

const seq = new Sequelize(database, user, password, conf);

// seq.authenticate().then(() => {
//     console.log('ok');
// }).catch((err) => {
//     console.log(err);
// })

module.exports = seq;
