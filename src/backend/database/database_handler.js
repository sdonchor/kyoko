const dbpath = "./src/backend/database/database.db";

const utils = require("../util/utils");
const crypto = require("crypto");

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(dbpath, err => {
  if (err) {
    console.log(err.message);
  }
});

module.exports = {
  /**AUTHENTICATION**/
  getUserByPassword: function(pw) {
    return new Promise((resolve, reject) => {
      let hash = utils.hash(pw);
      db.get(`SELECT * FROM users WHERE pwhash='${hash}'`, (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row && row.active === 0) {
            resolve("inactive");
          } else if (row) {
            resolve(row);
          } else {
            resolve(false);
          }
        }
      });
    });
  },
  isUserActive: function(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE id=${id} AND active=1`, (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            resolve(true);
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
  },
  getUserById: function(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT id,name,permission_level,active FROM users WHERE id='${id}'`, (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row){
            resolve(row);
          }
        }
      });
    });
  },
  getAllUsers: function(){
    return new Promise((resolve,reject)=>{
      db.all(`SELECT id, name, permission_level, active FROM users`,(err,rows)=>{
        if(err) reject(err);
        else
        {
          resolve(rows);
        }
      })
    })
  },

  /**MESSAGEBOARD**/
  getMessages: function() {
    return new Promise(function(resolve, reject) {
      db.all(
        `SELECT m.*, u.name, u.permission_level FROM messages m JOIN users u ON m.author=u.id WHERE m.active=1 ORDER BY m.time DESC`,
        (err, rows) => {
          if (err) reject(err);
          else {
           
            resolve(rows);
          }
        }
      );
    });
  },
  addMessage: function(message) {
    return new Promise(function(resolve, reject) {
      db.run(
        `INSERT INTO messages(time,content,author,active) 
      VALUES (datetime('now'),'${message.content}',${message.author}, 1)`,
        ( err) => {
          if (err) resolve(false);
          else resolve(true);
        }
      );
    });
  },
  removeMessage: function(id) {
    return new Promise(function(resolve,reject){
      db.run(
        `UPDATE messages SET active=0 WHERE id=${id}`,async (err)=>{
          if(err) resolve(false);
          else{
            resolve(true);
          }
        }
      )
    })
  }
};
