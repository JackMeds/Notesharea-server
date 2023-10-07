/**
 * @description note api 路由
 */

const router = require('koa-router')();

router.prefix('/api/note');

//查询推荐笔记列表
router.post("/recommend", async (ctx, next) => {
    const { userName } = ctx.request.body;
    console.log("api" + userName);
    ctx.body = await isExist(userName);
});
//TODO:查询笔记详情

//TODO:新建笔记

//TODO:修改笔记

//TODO:删除笔记

//TODO:笔记是否存在

