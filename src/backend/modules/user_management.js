const db = require('../database/database_handler')

module.exports={
    async logIn(pw){
        let auth = await db.getUserByPassword(pw);
        if (!auth) {
            return 0;
        } else if (auth === "inactive") {
            return "inactive";
        } else {
            return auth;
        }
    }
}