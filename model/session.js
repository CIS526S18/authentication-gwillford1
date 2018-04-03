const sqlite3 = require('sqlite3');
const encryption = require('./helpers/encryption');

// Create a database reference
var db = new sqlite3.Database('./data/roster.sqlite3');

module.exports = {
    loadSession: loadSession,
    validateSession: validateSession
}

function loadSession(req,res,next){
    var cookie = request.headers.cookie;
    var match = /session=(.+)/.exec(cookie);
    if (match){
        console.log("Session: ", encryption.decipher(match[1]));
        req.session = JSON.parse(encryption.decipher(match[1]));
    }
    next(req, res);
}

function validateSession(username, cryptedPassword, callback) {
    db.get("SELECT * FROM users WHERE username=?",username, function(err, row){
        if (err){
            console.error(err);
            return callback(err);
        }
        if (!user){
            return callback("No matching user!");
        }
        if (user.crypted_password == encryption.digest(password + user.salt)){
            callback(false,user);
        }
    });
}
