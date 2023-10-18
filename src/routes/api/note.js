/**
 * @description note api 路由
 */

const router = require("koa-router")();
const {
  createNoteController,
  getNoteDetailController,
  getAllNotesController,
  getRecommendNoteController,
  addRecommendNoteController,
  removeRecommendNoteController,
  getLikeStatusController,
  likeNoteController,
  unlikeNoteController,
  getCommentCountController,
  getCollectStatusController,
  collectNoteController,
  uncollectNoteController,
  getCollectNoteListController,
  getUserNoteListController,
  updateNoteController,
  deleteNoteController,
} = require("../../controller/note");

router.prefix("/api/note");

//查询推荐笔记列表
router.get("/recommendList", async (ctx, next) => {
  ctx.body = await getRecommendNoteController();
});

//添加推荐笔记
router.post("/addRecommend", async (ctx, next) => {
  const { adminId, noteId } = ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await addRecommendNoteController({ adminId, noteId });
});

//移除推荐笔记
router.patch("/removeRecommend", async (ctx, next) => {
  const { adminId, noteId } = ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await removeRecommendNoteController({ adminId, noteId });
});

//查询所有笔记
router.get("/allNotes", async (ctx, next) => {
  ctx.body = await getAllNotesController();
});

//查询笔记详情
router.get("/detail", async (ctx, next) => {
  const { noteId } = ctx.query;
  console.log(ctx.query);
  console.log("api" + noteId);
  ctx.body = await getNoteDetailController({ noteId });
  // const { noteId } = ctx.request.body;
  // console.log(ctx.request.body);
  // console.log("api" + noteId);
  // ctx.body = await getNoteDetailController({ noteId });
});

//发布笔记
router.post("/create", async (ctx, next) => {
  const { userId, noteTitle, noteContent, img, downloadLink } =
    ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await createNoteController({
    userId,
    noteTitle,
    noteContent,
    img,
    downloadLink,
  });
});

//点赞状态查询
router.get("/getLikeStatus", async (ctx, next) => {
  const { userId, noteId } = ctx.query;
  console.log(ctx.query);
  ctx.body = await getLikeStatusController({ userId, noteId });
});

//点赞笔记
router.post("/like", async (ctx, next) => {
  const { userId, noteId } = ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await likeNoteController({ userId, noteId });
});

//取消点赞笔记
router.post("/unlike", async (ctx, next) => {
  const { userId, noteId } = ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await unlikeNoteController({ userId, noteId });
});

//获取评论计数getCommentCount
router.get("/getCommentCount", async (ctx, next) => {
  const { noteId } = ctx.query;
  console.log(ctx.query);
  ctx.body = await getCommentCountController({ noteId });
}
);

//收藏状态查询
router.get("/getCollectStatus", async (ctx, next) => {
     const { userId, noteId } = ctx.query;
      console.log(ctx.query);
      ctx.body = await getCollectStatusController({ userId, noteId });
})

//收藏笔记
router.post("/collect", async (ctx, next) => {
  const { userId, noteId } = ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await collectNoteController({ userId, noteId });
});

//取消收藏笔记
router.post("/uncollect", async (ctx, next) => {
  const { userId, noteId } = ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await uncollectNoteController({ userId, noteId });
});

//获取用户收藏笔记的列表，包括笔记图片，笔记标题，笔记作者
router.get("/getCollectNoteList", async (ctx, next) => {
  const { userId } = ctx.query;
  console.log(ctx.query);
  ctx.body = await getCollectNoteListController({ userId });
})

//获取用户笔记列表
router.get("/getUserNoteList", async (ctx, next) => {
  const { userId } = ctx.query;
  console.log(ctx.query);
  ctx.body = await getUserNoteListController({ userId });
}
);

//修改笔记
router.post("/update", async (ctx, next) => {
  const { noteId, noteTitle, noteContent, img, downloadLink } =
    ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await updateNoteController({
    noteId,
    noteTitle,
    noteContent,
    img,
    downloadLink,
  });
});

//删除用户笔记
router.post("/deleteUserNote", async (ctx, next) => {
  const { noteId } = ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await deleteNoteController({ noteId });
});

module.exports = router;
