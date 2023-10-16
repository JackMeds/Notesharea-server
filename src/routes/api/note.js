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
router.post("/removeRecommend", async (ctx, next) => {
  const { adminId, noteId } = ctx.request.body;
  console.log(ctx.request.body);
  ctx.body = await addRecommendNoteController({ adminId, noteId });
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
//TODO:修改笔记

//TODO:删除笔记

//TODO:笔记是否存在

module.exports = router;
