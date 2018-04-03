const sqlite3 = require('sqlite3');
const encryption = require('../helpers/encryption');
var db = new sqlite3.Database('./roster.sqlite3')

db.run(
`
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
     username TEXT UNIQUE,
     admin BOOLEAN,
     crypted_password TEXT,
     salt TEXT
     );`
);

var salt = encryption.salt();

db.run("INSERT INTO users (username, admin, crypted_password, salt) values (?, ?, ?, ?)",
'admin',
true,
encryption.digest('insecurepassword' + salt),
salt
);