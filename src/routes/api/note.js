/**
 * @description note api 路由
 */

const router = require('koa-router')();
const { createNoteController } = require('../../controller/note');

router.prefix('/api/note');

//查询推荐笔记列表
router.post("/recommend", async (ctx, next) => {
    const { userName } = ctx.request.body;
    console.log("api" + userName);
    // ctx.body = await isExist(userName);
});
//TODO:查询笔记详情

//TODO:发布笔记
router.post("/create", async (ctx, next) => {
    const { userId, noteTitle, noteContent, img, downloadLink } = ctx.request.body;
    ctx.body = await createNoteController({
        userId,
        noteTitle,
        noteContent,
        img,
        downloadLink
    });

}
);
//TODO:修改笔记

//TODO:删除笔记

//TODO:笔记是否存在

module.exports = router;