const dbpath = "./src/backend/database/database.db";

const utils = require('../util/utils')
const crypto = require("crypto");

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(dbpath, (err)=>{
  if(err)
  {
    console.log(err.message);
  }
});

module.exports = {
  getUserByPassword: function(pw) {
    return new Promise((resolve,reject)=>{
      let hash = utils.hash(pw);
      db.get(`SELECT * FROM users WHERE pwhash='${hash}'`,(err,row)=>{
        if(err){
          reject(err);
        }
        else{
          if(row) {
            resolve(row);
          }
          else
          {
            resolve('0');
          }
        }
      });
    });
  },
 /* auth: function(pw, session, session_id) {
    return new Promise(function(resolve, reject) {
      hash = crypto
        .createHash("sha256")
        .update(pw)
        .digest("hex");
      db.get(`SELECT * FROM users WHERE pwhash='${hash}'`, (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            if (row.active === 0) {
              resolve("inactive");
            }
            let authData = {};
            authData.user = row.name;
            authData.permission_level = row.permission_level;
            authData.session_id = session_id;
            authData.id = row.id;
            session.authData = authData;
            resolve(authData);
          } else {
            resolve(false);
          }
        }
      });
    });
  },*/
  tokenAuth: function(token) {
    return new Promise(function(resolve, reject) {
      db.get(`SELECT * FROM tokens WHERE token='${token}'`, (err, row) => {
        if (err) reject(err);
        else if (row) resolve(1);
        else resolve(0);
      });
    });
  }
};
