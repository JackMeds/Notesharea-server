/**
 * @description 评论和回复的控制器
 */

const { createComment, createReply, getCommentList } = require('../services/comment_and_reply');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createCommentFailInfo, createReplyFailInfo, getCommentListFailInfo } = require('../model/ErrorInfo');

async function createCommentController({ noteId, userId, content }) {
    try {
        const comment = await createComment({ noteId, userId, content });
        return new SuccessModel(comment);
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(createCommentFailInfo);
    }
}

async function createReplyController({ commentId, userId, content }) {
    try {
        const reply = await createReply({ commentId, userId, content });
        return new SuccessModel(reply);
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(createReplyFailInfo);
    }
}

async function getCommentListController({ noteId }) {
    try {
        const commentList = await getCommentList({ noteId });
        return new SuccessModel(commentList);
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(getCommentListFailInfo);
    }
}

module.exports = {
    createCommentController,
    createReplyController,
    getCommentListController,
};