/**
 * @description 收藏数据模型
 */

const seq = require('../seq');
const { INTEGER, BOOLEAN } = require('../types');

const Collect = seq.define('collect', {
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
    isCollect: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否收藏'
    }
});

module.exports = Collect;