/**
 * @description note api 路由
 */

const router = require("koa-router")();
const {
  createNoteController,
  getNoteDetailController,
  getAllNotesController,
  getRecommendNoteController,
} = require("../../controller/note");

router.prefix("/api/note");

//查询推荐笔记列表
router.get("/recommend", async (ctx, next) => {
  ctx.body = await getRecommendNoteController();
});     

//查询所有笔记
router.get("/allNotes", async (ctx, next) => {
  ctx.body = await getAllNotesController();
});

//查询笔记详情
router.post("/detail", async (ctx, next) => {
  const { noteId } = ctx.request.body;
  console.log(ctx.request.body);
  console.log("api" + noteId);
  ctx.body = await getNoteDetailController({ noteId });
});

//发布笔记
router.post("/create", async (ctx, next) => {
  const { userId, noteTitle, noteContent, img, downloadLink } =
    ctx.request.body;
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
