/**
 * @description comment & reply api 路由
 */

const Note = require('../db/model/Note');
const User = require('../db/model/User');
const Collect = require('../db/model/Collect');
const Comment = require('../db/model/Comment');
const Like = require('../db/model/Like');
const Reply = require('../db/model/Reply');

//查询评论列表
async function getCommentList ({noteId}) {
    const result = await Comment.findAll({
        where: {
            noteId: noteId
        },
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            },
            {
                model: Reply,
                attributes: ['id', 'userId', 'commentId', 'content', 'createdAt'],
                include: [
                    {
                        model: User,
                        attributes: ['userName', 'nickName', 'picture']
                    }
                ]
            }
        ]
    });
    // console.log(result);
    return result;
}

//发布评论
async function createComment ({noteId, userId, content}) {
    const result = await Comment.create({
        noteId: noteId,
        userId: userId,
        content: content
    });
    // console.log(result.dataValues);
    return result.dataValues;
}

//发布回复
async function createReply ({commentId, userId, content}) {
    const result = await Reply.create({
        commentId: commentId,
        userId: userId,
        content: content
    });
    // console.log(result.dataValues);
    return result.dataValues;
}

module.exports = {
    createComment,
    createReply,
    getCommentList
};