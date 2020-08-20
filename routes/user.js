//db configuration
const { Op } = require('sequelize')
const User = require('../models/user')
//end db configuration

const message = require('../models/message')

//show messages
const showMessage = message.showMessage
//end show messages

//show messages by id
const getId = message.getId
//end show messages by id

//add messages
const newMessage = message.newMessage
const postMessage = message.postMessage
//end add messages

//edit messages
const getMessage = message.getMessage
const editMessage = message.editMessage
const updateMessage = message.updateMessage
//end edit messages

//delete messages
const deleteMessage = message.deleteMessage
//end delete messages

//ekspor hasil pengambilan objek
module.exports = {
    showMessage,
    getId,
    newMessage,
    postMessage,
    getMessage,
    editMessage,
    updateMessage,
    deleteMessage
}