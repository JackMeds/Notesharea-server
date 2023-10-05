/**
 * @description json schema 验证中间件
 */

const { ErrorModel } = require("../model/ResModel");
const { jsonSchemaFileInfo } = require("../model/ErrorInfo");
/**
 * 
 * @param {function} Validate 验证函数
 }} userValidate 
 */
function genValidator(userValidate){
    //定义中间件函数
    async function validator(ctx, next){
        const data = ctx.request.body;
        const error = userValidate(data);
        if (error){
            //验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo);
        }
        //验证成功，继续
        await next();
    }
    //返回中间件
    return validator;
}

module.exports = {
    genValidator
}