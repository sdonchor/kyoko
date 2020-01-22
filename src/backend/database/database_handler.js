const dbpath = "./src/backend/database/database.db";

const utils = require("../util/utils");
const crypto = require("crypto");
const sqlite3 = require("sqlite3");
const dateformat = require('dateformat');


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
      db.get(
        `SELECT t.id, u.name FROM tokens t JOIN users u ON t.owner=u.id WHERE token='${token}'`,
        (err, row) => {
          if (err) reject(err);
          else if (row) resolve(row);
          else resolve(false);
        }
      );
    });
  },
  getUserById: function(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT id,name,permission_level,active FROM users WHERE id='${id}'`,
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            if (row) {
              resolve(row);
            }
          }
        }
      );
    });
  },
  getAllUsers: function() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT id, name, permission_level, active FROM users`,
        (err, rows) => {
          if (err) reject(err);
          else {
            resolve(rows);
          }
        }
      );
    });
  },
  addUser: function(user) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users(name,pwhash,permission_level,active) VALUES
        ('${user.name}', '${user.pwhash}', ${user.permission_level}, ${user.active})`,
        err => {
          if (err) {
            console.log(err);
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  },

  removeUser: function(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM users WHERE id=${id}`, err => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  },
  editUser: function(user) {
    return new Promise((resolve, reject) => {
      let sql = null;
      if (user.pwhash) {
        sql = `UPDATE users SET 
        name='${user.name}', pwhash='${pwhash}', permission_level=${permission_level}, active=${active} WHERE id = ${user.id}`;
      } else {
        sql = `UPDATE users SET 
        name='${user.name}', permission_level=${permission_level}, active=${active} WHERE id = ${user.id}`;
      }
      db.run(sql, err => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
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
        err => {
          if (err) resolve(false);
          else resolve(true);
        }
      );
    });
  },
  removeMessage: function(id) {
    return new Promise(function(resolve, reject) {
      db.run(`UPDATE messages SET active=0 WHERE id=${id}`, async err => {
        if (err) resolve(false);
        else {
          resolve(true);
        }
      });
    });
  },
  /**VISITORS**/
  getVisitors: function() {
    return new Promise(function(resolve, reject) {
      db.all("SELECT * FROM visitors", (err, rows) => {
        if (err) resolve(false);
        else resolve(rows);
      });
    });
  },

  addVisitor: function(ip, ua, time) {
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO visitors VALUES('${ip}','${ua}','${time}')`, err => {
        if (err) console.log(err);
        else resolve(true);
      });
    });
  },

  /**LOGGER**/
  addLog: function(msg) {
    return new Promise(function(resolve, reject) {
      db.run(
        `INSERT INTO logs(category,content,time) VALUES
      ('${msg.category}','${msg.content}','${msg.time}')`,
        err => {
          if (err) resolve(false);
          else {
            resolve(true);
          }
        }
      );
    });
  },
  /**READINGS**/
  addReading: function(temperature, humidity) {
    return new Promise(function(resolve,reject){
      db.run(
        `INSERT INTO readings(temperature,humidity,time) VALUES
        (${temperature},${humidity},${dateformat(new Date(),'yyyy-mm-dd HH:MM:ss' )})`
        ,err=>{
          if(err) resolve(false);
          else resolve(true);
        }
      )
    })
  }
};
