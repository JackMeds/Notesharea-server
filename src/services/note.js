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

//查询推荐笔记列表
async function getRecommendNote() {
  const result = await recommendNote.findAll({
    attributes: ["noteId"],
    include: [
      {
        model: Note,
        attributes: ["id", "title", "content", "createdAt"],
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
                attributes: [
                  "id",
                  "userId",
                  "commentId",
                  "content",
                  "createdAt",
                ],
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
      },
    ],
  });
  return result.map((item) => item.dataValues);
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
      {
        model: recommendNote,
        attributes: ["noteId", "isRecommend"],
      }
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
  //增加浏览量
  await Note.update(
    {
      viewCount: result.dataValues.viewCount + 1,
    },
    {
      where: {
        id: noteId,
      },
    }
  );
  return result.dataValues;
}

//添加推荐笔记
async function addRecommendNote({ adminId, noteId }) {
  const existingRecommendNote = await recommendNote.findOne({
    where: {
      noteId,
    }
  });
  if (existingRecommendNote) {
    //更改推荐状态
    const updatedRecommendNote = await existingRecommendNote.update(
      {
        adminId,
        isRecommend: true // 这里默认设置为 true，您也可以根据需要更改
      },
      {
        where: {
          noteId
        }
      }
    )
    return updatedRecommendNote;
  } else {
    // 执行插入操作
    const newRecommendNote = await recommendNote.create({
      adminId,
      noteId,
      isRecommend: true // 这里默认设置为 true，您也可以根据需要更改
    });
    return newRecommendNote;
  }
}

//移除推荐笔记
async function removeRecommendNote({ adminId, noteId }) {
  const recommendNoteToDelete = await recommendNote.findOne({
    where: {
      noteId
    }
  });
  if (recommendNoteToDelete) {
    await recommendNoteToDelete.update(
      {
        adminId,
        isRecommend: false // 这里默认设置为 false，您也可以根据需要更改
      },
      {
        where: {
          noteId
        }
      }
    )
    return '推荐笔记已删除';
  } else {
    return '找不到要删除的推荐笔记';
  }
}

//点赞状态和数量查询
async function getLikeStatus({ userId, noteId }) {
  const existingLike = await Like.findOne({
    where: {
      userId,
      noteId,
    },
  });
  if (existingLike) {
    //查询点赞数量
    const likeCount = await Like.count({
      where: {
        noteId,
        isLike: true,
      },
    });
    //查询点赞状态
    const isLike = await Like.findOne({
      attributes: ["isLike"],
      where: {
        userId,
        noteId,
      },
    });
    return {
      likeCount: likeCount,
      isLike: isLike.isLike
    };
  } else {
    //查询点赞数量
    const likeCount = await Like.count({
      where: {
        noteId,
        isLike: true,
      },
    });
    return {
      likeCount: likeCount,
      isLike: false
    };
  }
}

//点赞笔记
async function likeNote({ userId, noteId }) {
  const existingLike = await Like.findOne({
    where: {
      userId,
      noteId,
    },
  });
  if (existingLike) {
    //更改点赞状态
    const updatedLike = await existingLike.update(
      {
        isLike: true, // 这里默认设置为 true，您也可以根据需要更改
      },
      {
        where: {
          userId,
          noteId,
        },
      }
    );
    //查询点赞数量
    const likeCount = await Like.count({
      where: {
        noteId,
        isLike: true,
      },
    });
    //更新点赞数量
    await Note.update(
      {
        likeCount,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    return {
      updatedLike : updatedLike,
      likeCount: likeCount,
      isLike: true
    };
  } else {
    // 执行插入操作
    const newLike = await Like.create({
      userId,
      noteId,
      isLike: true, // 这里默认设置为 true，您也可以根据需要更改
    });
    //查询点赞数量
    const likeCount = await Like.count({
      where: {
        noteId,
        isLike: true,
      },
    });
    //更新点赞数量
    await Note.update(
      {
        likeCount,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    return {
      newLike: newLike,
      likeCount: likeCount,
      isLike: true
    };
  }
}
//取消点赞笔记
async function unlikeNote({ userId, noteId }) {
  const existingLike = await Like.findOne({
    where: {
      userId,
      noteId,
    },
  });
  if (existingLike) {
    //更改点赞状态
    const updatedLike = await existingLike.update(
      {
        isLike: false, // 这里默认设置为 false，您也可以根据需要更改
      },
      {
        where: {
          userId,
          noteId,
        },
      }
    );
    //查询点赞数量
    const likeCount = await Like.count({
      where: {
        noteId,
        isLike: true,
      },
    });
    //更新点赞数量
    await Note.update(
      {
        likeCount,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    return {
      updatedLike : updatedLike,
      likeCount: likeCount,
      isLike: false
    };
  } else {
    // 执行插入操作
    const newLike = await Like.create({
      userId,
      noteId,
      isLike: false, // 这里默认设置为 false，您也可以根据需要更改
    });
    //查询点赞数量
    const likeCount = await Like.count({
      where: {
        noteId,
        isLike: true,
      },
    });
    //更新点赞数量
    await Note.update(
      {
        likeCount,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    return {
      newLike: newLike,
      likeCount: likeCount,
      isLike: false
    };
  }
}

//收藏状态和数量查询
async function getCollectStatus({ userId, noteId }) {
  const existingCollect = await Collect.findOne({
    where: {
      userId,
      noteId,
    },
  });
  if (existingCollect) {
    //查询收藏数量
    const collectCount = await Collect.count({
      where: {
        noteId,
        isCollect: true,
      },
    });
    //查询收藏状态
    const isCollect = await Collect.findOne({
      attributes: ["isCollect"],
      where: {
        userId,
        noteId,
      },
    });
    return {
      collectCount: collectCount,
      isCollect: isCollect.isCollect
    };
  } else {
    //查询收藏数量
    const collectCount = await Collect.count({
      where: {
        noteId,
        isCollect: true,
      },
    });
    return {
      collectCount: collectCount,
      isCollect: false
    };
  }
}

//收藏笔记
async function collectNote({ userId, noteId }) {
  const existingCollect = await Collect.findOne({
    where: {
      userId,
      noteId,
    },
  });
  if (existingCollect) {
    //更改收藏状态
    const updatedCollect = await existingCollect.update(
      {
        isCollect: true, // 这里默认设置为 true，您也可以根据需要更改
      },
      {
        where: {
          userId,
          noteId,
        },
      }
    );
    //查询收藏数量
    const collectCount = await Collect.count({
      where: {
        noteId,
        isCollect: true,
      },
    });
    //更新收藏数量
    await Note.update(
      {
        collectCount,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    return {
      updatedCollect : updatedCollect,
      collectCount: collectCount,
      isCollect: true
    };
  } else {
    // 执行插入操作
    const newCollect = await Collect.create({
      userId,
      noteId,
      isCollect: true, // 这里默认设置为 true，您也可以根据需要更改
    });
    //查询收藏数量
    const collectCount = await Collect.count({
      where: {
        noteId,
        isCollect: true,
      },
    });
    //更新收藏数量
    await Note.update(
      {
        collectCount,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    return {
      newCollect: newCollect,
      collectCount: collectCount,
      isCollect: true
    };
  }
}

//取消收藏笔记
async function uncollectNote({ userId, noteId }) {
  const existingCollect = await Collect.findOne({
    where: {
      userId,
      noteId,
    },
  });
  if (existingCollect) {
    //更改收藏状态
    const updatedCollect = await existingCollect.update(
      {
        isCollect: false, // 这里默认设置为 false，您也可以根据需要更改
      },
      {
        where: {
          userId,
          noteId,
        },
      }
    );
    //查询收藏数量
    const collectCount = await Collect.count({
      where: {
        noteId,
        isCollect: true,
      },
    });
    //更新收藏数量
    await Note.update(
      {
        collectCount,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    return {
      updatedCollect : updatedCollect,
      collectCount: collectCount,
      isCollect: false
    };
  } else {
    // 执行插入操作
    const newCollect = await Collect.create({
      userId,
      noteId,
      isCollect: false, // 这里默认设置为 false，您也可以根据需要更改
    });
    //查询收藏数量
    const collectCount = await Collect.count({
      where: {
        noteId,
        isCollect: true,
      },
    });
    //更新收藏数量
    await Note.update(
      {
        collectCount,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
    return {
      newCollect: newCollect,
      collectCount: collectCount,
      isCollect: false
    };
  }
}




//获取评论计数
async function getCommentCount({ noteId }) {
  const commentCount = await Comment.count({
    where: {
      noteId,
    },
  });
  return commentCount;
}

//获取用户收藏笔记的列表，包括笔记图片，笔记标题，笔记作者
async function getCollectNoteList({ userId }) {
  const result = await Collect.findAll({
    attributes: ["noteId"],
    where: {
      userId,
      isCollect: true,
    },
    include: [
      {
        model: Note,
        attributes: ["id", "title", "img", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["userName", "nickName", "picture"],
          },
        ],
      },
    ],
  });
  return result.map((item) => item.dataValues);
}
//查询当前用户全部笔记
async function getUserNoteList({ userId }) {
  const result = await Note.findAll({
    where: {
      userId,
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
  return result.map((item) => item.dataValues);
}

//修改用户笔记
async function updateNote({
  noteId,
  noteTitle,
  noteContent,
  img,
  downloadLink,
}) {
  const result = await Note.update(
    {
      title: noteTitle,
      content: noteContent,
      img: img,
      downloadLink: downloadLink,
    },
    {
      where: {
        id: noteId,
      },
    }
  );
  return result[0] > 0;
}

//删除用户笔记
async function deleteNote({
  noteId,
}) {
  const result = await Note.destroy({
    where: {
      id: noteId,
    },
  });
  return result[0] > 0;
}

module.exports = {
  createNote,
  getNoteDetail,
  getAllNotes,
  getRecommendNote,
  addRecommendNote,
  removeRecommendNote,
  likeNote,
  unlikeNote,
  getLikeStatus,
  getCommentCount,
  getCollectStatus,
  collectNote,
  uncollectNote,
  getCollectNoteList
  getUserNoteList,
  updateNote,
  deleteNote
};
