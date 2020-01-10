const db = require('./database_handler')
const dateformat = require('dateformat')
module.exports={
    log: function(category, content){

        const time=dateformat(new Date(),'yyyy-mm-dd hh:MM:ss' );
        const message = `[${time}] [${category}] ${message}`;
        console.log(message);
        db.addLog(message);
        
    }
}