const mysql = require("mysql");
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE} =  require('../config');

const db = mysql.createConnection({
    host:DB_HOST,
    port:DB_PORT,
    user: DB_USER,
    password:DB_PASSWORD,
    database:DB_DATABASE
});

db.connect(err=>{
    console.log("connected")
    if (err) {
        console.log(err.message);
        return
    }
});

module.exports = db;