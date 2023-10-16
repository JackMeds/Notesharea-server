/**
 * @description user controller
 */

const { getUserInfo, createUser, updateUser, getPeronaldataInfo } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo } = require('../model/ErrorInfo');
const doCrypto = require('../utils/cryp');


/**
 * 
 * @param {string} userName 用户名
 */
async function isExist({userName}) {
    // console.log("controller"+userName);
    const userInfo = await getUserInfo({userName});
    // console.log(userInfo);
    if (userInfo) {
        //已存在
        //{ code: 0, data: {....} }
        return new SuccessModel(userInfo);
    } else {
        //不存在
        //{ code: 10003, message: '用户名未存在' }
        return new ErrorModel(registerUserNameNotExistInfo);
    }
}

/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 (1 男， 2 女， 3 保密) 默认 3
 */
async function register({ userName, password, gender, nickName, email, phoneNum, userIntro, picture }) {
    const userInfo = await getUserInfo({userName});
    // console.log(userInfo);
    if (userInfo) {
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo);
    }

    //注册 service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender,
            nickName,
            email,
            phoneNum,
            userIntro,
            picture,
        });
        return new SuccessModel();
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(registerFailInfo);
    }

}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名 
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
    //登陆成功 ctx.session.userInfo = xxx
    //获取用户信息
    const loginMessage = {
        userName, 
        password: doCrypto(password)
    }
    console.log(loginMessage);
    const userInfo = await getUserInfo(loginMessage);
    if (!userInfo){
        //登陆失败
        // console.log(userInfo);
        return new ErrorModel(loginFailInfo);
    }

    //登陆成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo;
    }
    // console.log(ctx.session);
    const data = {
        session: ctx.session,
    }
    // console.log(data);
    return new SuccessModel(data);
}

//退出登录
async function logoutController(ctx) {
    ctx.session = null;
    // ctx.cookies.set('Notesharea.sid', '', { expires: new Date(1), path: '/' });
    // ctx.cookies.set('Notesharea.sid.sig', '', { expires: new Date(1), path: '/' });
    return new SuccessModel();
}

// 获取个人信息数据
async function getPeronalInfo(ctx) {
    const userId = ctx.query.userId;
    console.log('control',userId);
    try {
      const userInfo = await getPeronaldataInfo(userId);
      return userInfo.dataValues; // 返回数据
    //   ctx.body = userInfo.dataValues;
    //   console.log('controls',ctx.body);
    } catch (error) {
      console.error('Error in getUserInfoController:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }


/**
 * @param {object} ctx ctx
 * @param {string} userName 用户名
 * @param {string} nickName 昵称
 * @param {string} email 邮箱
 * @param {string} phoneNum 手机号码
 * @param {string} userIntro 个人简介
 * @param {string} picture 头像
 */
async function changeInfo(ctx, {userId, nickName,gender, email, phoneNum, userIntro, picture }) {
    try {
        //  userId = ctx.session.userInfo.id;
        if (!userId) {
            throw new Error('User ID is not valid');
        }

        // 构造更新数据
        const updateData = {
            newNickName: nickName,
            newGender:gender,
            newEmail: email,
            newPhoneNum: phoneNum,
            newUserIntro: userIntro,
            newPicture: picture,
        };

        console.log('control', updateData);
        console.log('controlid',userId);

        // 调用更新函数
        const result = await updateUser(updateData,userId);
        console.log('controlss',result);
        if (result && result.code !== undefined) {
            // 执行成功
            
            Object.assign(ctx.session.userInfo, {
                nickName,
                gender,
                email,
                phoneNum,
                userIntro,
                picture,
            });
            // 返回成功模型
            return new SuccessModel(message,'success');
        } else {
            // 失败
            return new ErrorModel({ errno: 10009, message: 'Change info failed' });
        }
    } catch (error) {
        console.error('Error in changeInfo:', error);
        return new ErrorModel('Internal Server Error');
    }
}




module.exports = {
    isExist,
    register,
    login,
    changeInfo,
    getPeronalInfo,
}