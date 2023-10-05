/**
 * @description 错误信息集合
 */

module.exports = {
    //用户名已存在
    registerUserNameExistInfo: {
        code: 10001,
        message: '用户名已存在'
    },

    //注册失败
    registerFailInfo: {
        code: 10002,
        message: '注册失败，请重试'
    },

    //用户名不存在
    registerUserNameNotExistInfo: {
        code: 10003,
        message: '用户名未存在'
    },
    
    //json schema 校验失败
    jsonSchemaFileInfo:{
        errno:10009,
        message:'数据格式校验错误'
    }
}