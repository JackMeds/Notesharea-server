/**
 * @description note controller
 */

const { createNote,
  getNoteDetail,
  getAllNotes,
  getRecommendNote,
  addRecommendNote,
  removeRecommendNote,
  getLikeStatus,
  likeNote,
  unlikeNote,
  getCommentCount,
  getCollectStatus,
  collectNote,
  uncollectNote,
  getCollectNoteList,
  getUserNoteList,
  updateNote,
  deleteNote
} = require("../services/note");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createNoteFailInfo } = require("../model/ErrorInfo");

//创建笔记
async function createNoteController({
  userId,
  noteTitle,
  noteContent,
  img,
  downloadLink,
}) {
  try {
    await createNote({
      userId,
      noteTitle,
      noteContent,
      img,
      downloadLink,
    });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}
//查询推荐笔记列表
async function getRecommendNoteController() {
  try {
    const result = await getRecommendNote();
    return new SuccessModel(result);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//查询所有笔记
async function getAllNotesController() {
  try {
    const result = await getAllNotes();
    return new SuccessModel(result);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//查询笔记详情
async function getNoteDetailController({ noteId }) {
  try {
    const result = await getNoteDetail({
      noteId,
    });
    return new SuccessModel(result);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//添加推荐笔记
async function addRecommendNoteController({ adminId, noteId }) {
  try {
    await addRecommendNote({
      adminId,
      noteId,
    });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//移除推荐笔记
async function removeRecommendNoteController({ adminId, noteId }) {
  try {
    await removeRecommendNote({
      adminId,
      noteId,
    });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//点赞状态查询
async function getLikeStatusController({ userId, noteId }) {
  try {
    const result = await getLikeStatus({
      userId,
      noteId,
    });
    // console.log(result);
    return new SuccessModel({ likeCount: result.likeCount, isLike: result.isLike });
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//点赞笔记
async function likeNoteController({ userId, noteId }) {
  try {
    const result = await likeNote({
      userId,
      noteId,
    });
    return new SuccessModel({ likeCount: result.likeCount, isLike: result.isLike });
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//取消点赞笔记
async function unlikeNoteController({ userId, noteId }) {
  try {
    const result = await unlikeNote({
      userId,
      noteId,
    });
    return new SuccessModel({ likeCount: result.likeCount, isLike: result.isLike });
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//收藏状态查询
async function getCollectStatusController({ userId, noteId }) {
  try {
    const result = await getCollectStatus({
      userId,
      noteId,
    });
    return new SuccessModel({ collectCount: result.collectCount, isCollect: result.isCollect });
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//收藏笔记
async function collectNoteController({ userId, noteId }) {
  try {
    const result = await collectNote({
      userId,
      noteId,
    });
    return new SuccessModel({ collectCount: result.collectCount, isCollect: result.isCollect });
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//取消收藏笔记
async function uncollectNoteController({ userId, noteId }) {
  try {
    const result = await uncollectNote({
      userId,
      noteId,
    });
    return new SuccessModel({ collectCount: result.collectCount, isCollect: result.isCollect });
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//获取用户收藏笔记的列表，包括笔记图片，笔记标题，笔记作者
async function getCollectNoteListController({ userId }) {
  try {
    const result = await getCollectNoteList({
      userId,
    });
    return new SuccessModel(result);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}


//获取评论计数getCommentCount
async function getCommentCountController({ noteId }) {
  try {
    const result = await getCommentCount({
      noteId,
    });
    return new SuccessModel(result);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//获取用户笔记列表
async function getUserNoteListController({ userId }) {
  try {
    const result = await getUserNoteList({
      userId,
    });
    return new SuccessModel(result);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//修改笔记
async function updateNoteController({ noteId, noteTitle, noteContent, img, downloadLink }) {
  try {
    await updateNote({
      noteId,
      noteTitle,
      noteContent,
      img,
      downloadLink,
    });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

//删除用户笔记
async function deleteNoteController({ noteId }) {
  try {
    await deleteNote({
      noteId,
    });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createNoteFailInfo);
  }
}

module.exports = {
  createNoteController,
  getAllNotesController,
  getNoteDetailController,
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
};
