/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user');
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
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName);
    console.log(userInfo);
    if (userInfo) {
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo);
    }

    //注册 service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
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
        console.log(userInfo);
        return new ErrorModel(loginFailInfo);
    }

    //登陆成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel();
}

module.exports = {
    isExist,
    register,
    login
}