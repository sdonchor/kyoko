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
    },
    permsCheck(required){
        return function(req,res,next)
        {
            if(req.signedCookies.user && req.signedCookies.user.permission_level>=required)
            {
                next();
            }
            else
            {
                res.end('0');
            }
        }
        
    },
    async getUserById(id){
        let user = await db.getUserById(id);
        return user;
    }
}