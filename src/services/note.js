/**
 * @description note service
 */

const Note = require("../db/model/Note");
const User = require("../db/model/User");
const Collect = require("../db/model/Collect");
const Comment = require("../db/model/Comment");
const Like = require("../db/model/Like");
const Reply = require("../db/model/Reply");
const Administrator = require("../db/model/Administrator");
const recommendNote = require("../db/model/recommendNote");
// const { formatUser, formatNote, formatComment, formatReply } = require('./_format');

//创建笔记
async function createNote({
  userId,
  noteTitle,
  noteContent,
  img,
  downloadLink,
}) {
  const result = await Note.create({
    userId: userId,
    title: noteTitle,
    content: noteContent,
    img: img,
    downloadLink: downloadLink,
  });
  // console.log(result.dataValues);
  return result.dataValues;
}

//查询所有笔记
async function getAllNotes() {
  const notes = await Note.findAll({
    attributes: ["id", "title", "content", "createdAt"], // 选择你需要的笔记属性
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
      },
      {
        model: Collect,
        attributes: ["userId", "noteId"],
      },
      {
        model: Comment,
        attributes: ["id", "userId", "noteId", "content", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["userName", "nickName", "picture"],
          },
          {
            model: Reply,
            attributes: ["id", "userId", "commentId", "content", "createdAt"],
            include: [
              {
                model: User,
                attributes: ["userName", "nickName", "picture"],
              },
            ],
          },
        ],
      },
      {
        model: Like,
        attributes: ["userId", "noteId"],
      },
    ],
  });
  return notes.map((note) => note.dataValues);
}

//查询笔记详情
async function getNoteDetail({ noteId }) {
  const result = await Note.findOne({
    where: {
      id: noteId,
    },
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
      },
      {
        model: Collect,
        attributes: ["userId", "noteId"],
      },
      {
        model: Comment,
        attributes: ["id", "userId", "noteId", "content", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["userName", "nickName", "picture"],
          },
          {
            model: Reply,
            attributes: ["id", "userId", "commentId", "content", "createdAt"],
            include: [
              {
                model: User,
                attributes: ["userName", "nickName", "picture"],
              },
            ],
          },
        ],
      },
      {
        model: Like,
        attributes: ["userId", "noteId"],
      },
    ],
  });
  if (result == null) {
    return result;
  }
  return result.dataValues;
}
module.exports = {
  createNote,
  getNoteDetail,
  getAllNotes
};
