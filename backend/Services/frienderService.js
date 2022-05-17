
const dbConnection = require('../DataAccess/Config')

module.exports.getAllGenders = function() { 
  return new Promise(function(resolve, reject) {
    // TODO
    let SQL = `SELECT * FROM loginInDetails WHERE email = '${email}' && password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length >= 1) {
        resolve(result);
      }
      else{
        reject("sorry champ")
      }
    });
  });
}

module.exports.getAllInterests = function() { 
  return new Promise(function(resolve, reject) {
    // TODO
    let SQL = `SELECT * FROM loginInDetails WHERE email = '${email}' && password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length >= 1) {
        resolve(result);
      }
      else{
        reject("sorry champ")
      }
    });
  });
}

module.exports.getLogins = function(email, password) { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT * FROM loginInDetails WHERE email = '${email}' && password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length >= 1) {
        resolve(result);
      }
      else{
        reject("sorry champ")
      }
    });
  });
}

module.exports.signUp = function(firstName, lastName, email, password) {
  return new Promise(function(resolve, reject) {
    let SQL = `INSERT INTO loginInDetails (firstName, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.rowsAffected >= 1) {
        resolve("Successfully signed up!");
      }
      else{
        reject("sorry champ")
      }
    });
  });
}

module.exports.getMatches = function(userId) { 
  return new Promise(function(resolve, reject) {
    // TODO
    let SQL = `SELECT * FROM loginInDetails WHERE email = '${email}' && password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length >= 1) {
        resolve(result);
      }
      else{
        reject("sorry champ")
      }
    });
  });
}

module.exports.getUserProfileDetails = function(userId) { 
  return new Promise(function(resolve, reject) {
    // TODO
    let SQL = `SELECT * FROM loginInDetails WHERE email = '${email}' && password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length >= 1) {
        resolve(result);
      }
      else{
        reject("sorry champ")
      }
    });
  });
}

module.exports.createUserProfile = function(userId) { 
  return new Promise(function(resolve, reject) {
    // TODO
    let SQL = `SELECT * FROM loginInDetails WHERE email = '${email}' && password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length >= 1) {
        resolve(result);
      }
      else{
        reject("sorry champ")
      }
    });
  });
}

module.exports.updateUserProfile = function(userId) { 
  return new Promise(function(resolve, reject) {
    // TODO
    let SQL = `SELECT * FROM loginInDetails WHERE email = '${email}' && password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length >= 1) {
        resolve(result);
      }
      else{
        reject("sorry champ")
      }
    });
  });
}

module.exports.likeFriend = function(userId, friendId) { 
  return new Promise(function(resolve, reject) {
    // TODO
    let SQL = `SELECT * FROM loginInDetails WHERE email = '${email}' && password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length >= 1) {
        resolve(result);
      }
      else{
        reject("sorry champ")
      }
    });
  });
}