/**
 * @description note controller
 */

const { createNote, getNoteDetail, getAllNotes } = require("../services/note");
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

//查询所有笔记
async function getAllNotesController() {
    try{
        const result = await getAllNotes();
        return new SuccessModel(result);
    }catch(ex){
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
module.exports = {
  createNoteController,
  getAllNotesController,
  getNoteDetailController,
};
