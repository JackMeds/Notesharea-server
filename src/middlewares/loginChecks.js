/**
 * @description 登录验证的中间件
 */
const { ErrorModel } = require("../model/ResModel");
const { loginCheckFailInfo } = require("../model/ErrorInfo");

/**
 * 
 * @param {object0} ctx 
 * @param {Function} next 
 */
async function loginCheck(ctx, next) {
    if(ctx.session && ctx.session.userInfo) {
        //已登录
        await next();
        return;
    }
    //未登录
    ctx.body = new ErrorModel(loginCheckFailInfo);
}

/**
 * 页面登录验证
 * @param {} ctx 
 * @param {*} next 
 * @returns 
 */
async function loginRedirect(ctx, next) {
    if(ctx.session && ctx.session.userInfo) {
        //已登录
        await next();
        return;
    }
    //未登录
    const curUrl = ctx.url; //获取当前url
}
module.exports = {
    loginCheck,
    loginRedirect
}