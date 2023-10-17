/**
 * @description 点赞数据模型
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const Like = seq.define('like', {
    userId: {
        type: INTEGER,
        allowNull: false,
        unique: true,
        comment: '用户 ID'
    },
    noteId: {
        type: INTEGER,
        allowNull: false,
        unique: true,
        comment: '笔记 ID'
    },
    isLike: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否点赞'
    }
});

module.exports = Like;