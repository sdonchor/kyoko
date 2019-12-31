let dbpath = "./src/backend/database/database.db";

const crypto = require("crypto");

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(dbpath);

module.exports = {
  auth: function(pw, session, session_id) {
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
            authData.user_pic = row.pic;
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
  },
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
