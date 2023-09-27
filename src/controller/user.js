/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo');

/**
 * 
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName);
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

module.exports = {
    isExist
}