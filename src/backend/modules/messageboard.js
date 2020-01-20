const db = require('../database/database_handler');

const getMessages = async function(){
    let msgs = await db.getMessages();
    return msgs;
}

const addMessage = async function(message){
    let status = await db.addMessage(message);
    return status;
}

const removeMessage = async function(id){
    let status = await db.removeMessage(id);
    return status;

}


module.exports={
    getMessages,
    addMessage,
    removeMessage
}