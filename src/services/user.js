/**
 * @description user service
 */

const { str } = require("ajv");
const { User } = require("../db/model/index");
const { formatUser } = require("./_format");
const { DEFAULT_PICTURE } = require("../conf/constant");
/**
 *
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo({ userName, password }) {
    console.log("service" + userName);
    console.log("service" + password);
    //查询条件
    const whereOpt = {
        userName,
    };
    if (password) {
        Object.assign(whereOpt, { password });
    }

    console.log(whereOpt);

    //查询
    const result = await User.findOne({
        attributes: [
            "id",
            "userName",
            "nickName",
            "picture",
            "gender",
            "email",
            "phoneNum",
            "userIntro",
            "picture",
        ],
        where: whereOpt,
    });
    if (result == null) {
        //未找到
        return result;
    }

    return result.dataValues;

    //TODO:格式化
    // //格式化
    // const formatRes = formatUser(result.dataValues);

    // return formatRes;
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 (1 男， 2 女， 3 保密) 默认 3
 * @param {string} nickName 昵称
 */
async function createUser({
    userName,
    password,
    gender = 3,
    nickName,
    email,
    phoneNum,
    userIntro,
    picture,
}) {
    const result = await User.create({
        userName: userName,
        password: password,
        nickName: nickName ? nickName : userName,
        gender: gender,
        email: email,
        phoneNum: phoneNum,
        userIntro: userIntro,
        picture: picture ? picture : DEFAULT_PICTURE,
    });
    // console.log(result.dataValues);
    return result.dataValues;
}

//查询用户列表
async function getAllUsers() {
    const result = await User.findAll({
        attributes: ["id", "userName", "nickName", "gender", "email"],
    });
    // console.log(result.dataValues);
    return result.map((item) => item.dataValues);
}

//获取个人数据
async function getPeronaldataInfo(userId) {
    console.log('service', userId)
    const whereOpt = {
        id: userId,
    };
    try {
        const userInfo = await User.findOne({
            where: whereOpt,// 查询条件是id等于userId
            attributes: [
                "id",
                "userName",
                "nickName",
                "gender",
                "email",
                "phoneNum",
                "userIntro",
                "picture"
            ],
        });
        if (userInfo === null) {
            console.log('No user found for the given userId.');
        } else {
            console.log('serviceinfo', userInfo.dataValues);  // Print the user information
        }
        return userInfo;
    } catch (error) {
        console.error('Error in getUserInfo:', error);
        throw new Error('Failed to get user information.');
    }
}

/**
 * 修改个人信息
 * @param {Object} newUserInfo 包含新的用户信息
 * @param {string} newUserInfo.newUserName 新用户名
 * @param {string} newUserInfo.newNickName 新昵称
 * @param {string} newUserInfo.newEmail 新邮箱
 * @param {string} newUserInfo.newPhoneNum 新手机号
 * @param {string} newUserInfo.newUserIntro 新个人简介
 * @param {string} newUserInfo.newPicture 新头像
 * @param {Object} authInfo 包含用户名和密码
 * @param {string} authInfo.userName 用户名
 * @param {string} authInfo.password 密码
 */

async function updateUser(newUserInfo, authInfo) {
    const { newUserName, newNickName, newGender, newEmail, newPhoneNum, newUserIntro, newPicture } = newUserInfo;
    const { userId } = authInfo;
    //拼接修改内容
    const updateData = {};
    if (newUserName) {
        updateData.userName = newUserName;
    }
    if (newNickName) {
        updateData.nickName = newNickName;
    }
    if (newGender) {
        updateData.gender = newGender;
    }
    if (newEmail) {
        updateData.email = newEmail;
    }
    if (newPhoneNum) {
        updateData.phoneNum = newPhoneNum;
    }
    if (newUserIntro) {
        updateData.userIntro = newUserIntro;
    }
    if (newPicture) {
        updateData.picture = newPicture;
    }
    console.log('service', newUserInfo)
    console.log('service', authInfo)
    console.log(userId)
    //拼接查询条件
    const whereData = {
        id: authInfo,
    };
    //执行修改
    const result = await User.update(updateData, {
        where: whereData,
    });

    return result[0] > 0;//修改的行数
}






module.exports = {
    getUserInfo,
    createUser,
    updateUser,
    getAllUsers,
    getPeronaldataInfo,
};
