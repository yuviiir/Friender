
const dbConnection = require('../DataAccess/Config')

module.exports.getLogins = function(email, password) 
    { return new Promise(function(resolve, reject) {
        console.log(email, password)
        let SQL = `SELECT * FROM loginInDetails WHERE email = '${email}' && password = '${password}'`
        dbConnection.query(SQL, function (err, result) {
            if (err) throw err;
            if (result.length >= 1)
            resolve(result);
            else{
                resolve("sorry champ")
            }
    });
})}

module.exports.signUp = function(firstName, lastName, email, password) 
    { return new Promise(function(resolve, reject) {
        console.log(email, password)
        let SQL = `INSERT INTO loginInDetails (firstName, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`
        dbConnection.query(SQL, function (err, result) {
            if (err) throw err;
            if (result.rowsAffected >= 1)
            resolve("Successfully signed up!");
            else{
                resolve("sorry champ")
            }
    });
})}