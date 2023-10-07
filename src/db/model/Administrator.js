/**
 * @description admin 数据模型
 */

const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

const Administrator = seq.define('administrator', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: STRING,
        allowNull: false,
        comment: '密码'
    },
    email: {
        type: STRING,
        allowNull: false,
        comment: '邮箱'
    }
});

module.export = Administrator;