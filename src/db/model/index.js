/**
 * @description 数据模型入口文件
 */

const User = require('./User');
const Note = require('./Note');
const Collect = require('./Collect');
const Comment = require('./Comment');
const Like = require('./Like');
const Reply = require('./Reply');
const Administrator = require('./Administrator');
const recommendNote = require('./recommendNote');

// 外键关联
// 一个用户可以有多个笔记
User.hasMany(Note, {
    foreignKey: 'userId'
});
// 一个笔记只能属于一个用户
Note.belongsTo(User, {
    foreignKey: 'userId'
});

// 一个用户可以有多个评论
User.hasMany(Comment, {
    foreignKey: 'userId'
});
// 一个评论只能属于一个用户
Comment.belongsTo(User, {
    foreignKey: 'userId'
});

// 一个用户可以有多个回复
User.hasMany(Reply, {
    foreignKey: 'userId'
});
// 一个回复只能属于一个用户
Reply.belongsTo(User, {
    foreignKey: 'userId'
});

// 一个笔记可以有多个评论
Note.hasMany(Comment, {
    foreignKey: 'noteId'
});
// 一个评论只能属于一个笔记
Comment.belongsTo(Note, {
    foreignKey: 'noteId'
});

// 一个评论可以有多个回复
Comment.hasMany(Reply, {
    foreignKey: 'commentId'
});
// 一个回复只能属于一个评论
Reply.belongsTo(Comment, {
    foreignKey: 'commentId'
});

// 一个笔记可以有多个收藏
Note.hasMany(Collect, {
    foreignKey: 'noteId'
});
// 一个收藏只能属于一个笔记
Collect.belongsTo(Note, {
    foreignKey: 'noteId'
});
// 一个用户可以有多个收藏
User.hasMany(Collect, {
    foreignKey: 'userId'
});
// 一个收藏只能属于一个用户
Collect.belongsTo(User, {
    foreignKey: 'userId'
});
// 一个笔记可以有多个点赞
Note.hasMany(Like, {
    foreignKey: 'noteId'
});
// 一个点赞只能属于一个笔记
Like.belongsTo(Note, {
    foreignKey: 'noteId'
});
// 一个用户可以有多个点赞
User.hasMany(Like, {
    foreignKey: 'userId'
});
// 一个点赞只能属于一个用户
Like.belongsTo(User, {
    foreignKey: 'userId'
});
// 一个管理员用户可以有多个推荐
// Administrator.hasMany(recommendNote, {
//     foreignKey: 'adminId'
// });

// 一个推荐只能属于一个管理员用户
// recommendNote.belongsTo(Administrator, {
//     foreignKey: 'adminId'
// });
// 一个笔记可以有多个推荐
Note.hasMany(recommendNote, {
    foreignKey: 'noteId'
});
// 一个推荐只能属于一个笔记
recommendNote.belongsTo(Note, {
    foreignKey: 'noteId'
});


module.exports = {
    User,
    Note,
    Collect,
    Comment,
    Like,
    Reply,
    Administrator,
    recommendNote
}