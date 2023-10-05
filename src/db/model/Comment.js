/**
 * @description 评论数据模型
 */

const seq = require('../seq');
const { STRING, INTEGER, TEXT } = require('../types');

const Comment = seq.define('comment', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    noteId: {
        type: INTEGER,
        allowNull: false,
        comment: '笔记 ID'
    },
    replyId: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '回复 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '评论内容'
    }
});

module.exports = Comment;