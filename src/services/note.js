/**
 * @description note service
 */

const Note = require('../db/model/Note');
const User = require('../db/model/User');
const Collect = require('../db/model/Collect');
const Comment = require('../db/model/Comment');
const Like = require('../db/model/Like');
const Reply = require('../db/model/Reply');
const Administrator = require('../db/model/Administrator');
const recommendNote = require('../db/model/recommendNote');
// const { formatUser, formatNote, formatComment, formatReply } = require('./_format');


async function createNote ({userId, noteTitle, noteContent, img, downloadLink}) {
    const result = await Note.create({
        userId: userId,
        title: noteTitle,
        content: noteContent,
        img: img,
        downloadLink: downloadLink
    });
    // console.log(result.dataValues);
    return result.dataValues;
}

module.exports = {
    createNote
}