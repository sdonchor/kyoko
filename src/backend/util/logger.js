const db = require('../database/database_handler')
const dateformat = require('dateformat')
module.exports={
    log: function(category, content){

        const time=dateformat(new Date(),'yyyy-mm-dd HH:MM:ss' );
        const msg = {
            time,
            category,
            content
        }
        db.addLog(msg);
    }
}