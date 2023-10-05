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

//手动添加用户信息
async function addUser(userName, password, nickName, picture, gender, email, phoneNum, userIntro){
    //添加用户信息
    await User.create({
        "userName": userName,
        "password": password,
        "nickName": nickName,
        "picture": picture,
        "gender": gender,
        "email": email,
        "phoneNum": phoneNum,
        "userIntro": userIntro
    });

    //查询用户信息
    await getUserInfo(userName);
}

module.exports = {
    getUserInfo,
    addUser
}