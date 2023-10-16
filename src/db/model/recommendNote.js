/**
 * @description recommendNote 数据模型
 */

const seq = require('../seq');
const { STRING, INTEGER, BOOLEAN } = require('../types');

const RecommendNote = seq.define('recommendNote', {
    adminId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    noteId: {
        type: INTEGER,
        allowNull: false,
        //唯一
        unique: true,
        comment: '笔记 ID'
    },
    isRecommend: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否推荐'
    }
});

module.exports = RecommendNote;