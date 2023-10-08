/**
 * @description note controller
 */

const { createNote } = require('../services/note');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createNoteFailInfo } = require('../model/ErrorInfo');

async function createNoteController({ userId, noteTitle, noteContent, img, downloadLink }) {
    try {
        await createNote({
            userId,
            noteTitle,
            noteContent,
            img,
            downloadLink
        });
        return new SuccessModel();
    } catch (ex) {
        console.error(ex.message, ex.stack);
        return new ErrorModel(createNoteFailInfo);
    }
}

module.exports = {
    createNoteController
}