/**
 * @description user service
 */

// 引用数据库模型
const { User } = require('../db/model/index');
// 引用格式化数据的方法
const { formatUser } = require('./_format');

/**
 * @description 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
    //查询条件
    const whereOpt = {
        userName
    };
    if (password) {
        Object.assign(whereOpt, { password });
    }

    //查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'gender', 'email', 'phoneNum', 'userIntro'],
        where: whereOpt
    });
    if (result == null) {
        //未找到
        return result;
    }

    //格式化用户数据
    const formatRes = formatUser(result.dataValues);

    return formatRes;
}


/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 (1 男， 2 女， 3 保密) 默认 3
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3,  nickName }){
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    });
    console.log(result);
    return result.dataValues;
}

module.exports = {
    getUserInfo,
    createUser
}