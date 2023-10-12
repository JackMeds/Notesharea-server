/**
 * @description comment & reply api 路由
 */

const router = require('koa-router')();
const { createCommentController, createReplyController, getCommentListController } = require('../../controller/comment_and_reply');

router.prefix('/api/comment_and_reply');

//查询评论列表
router.post("/list", async (ctx, next) => {
    const { noteId } = ctx.request.body;
    // console.log("api" + userName);
    ctx.body = await getCommentListController({ noteId });
});

//发布评论
router.post("/createComment", async (ctx, next) => {
    const { noteId, userId, content } = ctx.request.body;
    // console.log("api" + userName);
    ctx.body = await createCommentController({ noteId, userId, content });
});

//发布回复
router.post("/createReply", async (ctx, next) => {
    const { commentId, userId, content } = ctx.request.body;
    // console.log("api" + userName);
    ctx.body = await createReplyController({ commentId, userId, content });
});


module.exports = router;