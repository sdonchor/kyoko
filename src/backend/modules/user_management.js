const db = require('../database/database_handler')
const logger = require('../util/logger');
const utils = require('../util/utils');
const log = logger.log;
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
                let user = req.signedCookies.user ? 
                `(ID: ${req.signedCookies.user.id}) ${req.signedCookies.user.name}` : 
                'Unknown user';
                let perms = req.signedCookies.user ?
                req.signedCookies.user.permission_level:
                -1;
                log("security",`${user} tried to access '${req.originalUrl}' with insufficient permissions (has ${perms}, required ${required}).`);
                res.end('0');
            }
        }
        
    },
    async getUserById(id){
        let user = await db.getUserById(id);
        return user;
    },
    async addUser(name,pw,permission_level,active){
        let user = {
            name,
            pwhash: utils.hash(pw),
            permission_level,
            active
        }
        let status = await db.addUser(user);
        return status;
    },
    async removeUser(id){

    },
    async editUser(id, name, pw,permission_level,active)
    {
        let pwhash = pw ? utils.hash(pw) : null;
        let user = {
            id,
            name,
            pwhash,
            permission_level,
            active
        }
        let status = db.editUser(user);
        return status;
    }
}