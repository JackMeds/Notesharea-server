/**
 * @description 回复数据模型
 */

const seq = require('../seq');
const { INTEGER, TEXT } = require('../types');

const Reply = seq.define('reply', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    commentId: {
        type: INTEGER,
        allowNull: false,
        comment: '评论 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '回复内容'
    }
});

module.exports = Reply;