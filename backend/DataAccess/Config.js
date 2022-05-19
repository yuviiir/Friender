const mysql = require("mysql");

const db = mysql.createConnection({
    host:"frienderdb.cluster-clu6icw3etai.us-east-1.rds.amazonaws.com",
    port:"3306",
    user:"admin", //remove this later or hide it
    password:"frienderdb123",
    database:"frienderDB"
});

db.connect(err=>{
    console.log("connected")
    if (err) {
        console.log(err.message);
        return
    }
});

module.exports = db;