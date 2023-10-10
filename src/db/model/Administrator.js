/**
 * @description 管理员用户数据模型
 */

const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');


//administrator
const Administrator = seq.define('administrator', {
    userName: {
        type: STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
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
    },
    picture: {
        type: STRING,
        comment: '头像，图片地址'
    },
    phoneNum: {
        type: STRING,
        comment: '手机号'
    },
    userIntro: {
        type: STRING,
        comment: '个人简介'
    }
});

module.exports = Administrator;