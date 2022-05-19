
const dbConnection = require('../DataAccess/Config')

module.exports.test = function() { 
  return new Promise(function(resolve, reject) {
    let userId = 52;
    // let SQL = `SELECT userId FROM likedUsers lu WHERE EXISTS (SELECT LikedUser FROM likedUsers lu2 WHERE lu2.userId = '${userId}' AND lu2.LikedUser = lu.userID) AND lu.LikedUser = '${userId}'`
    let SQL = `SELECT * FROM likedUsers`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports.getAllGenders = function() { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT genderId, genderDescription FROM genderLookUp`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports.getAllInterests = function() { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT interestId, interestDescription FROM interests`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports.getLogins = function(email, password) { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT userId, firstName, lastName, email FROM loginInDetails WHERE email = '${email}' AND password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
      }
      if (result.length >= 1) {
        resolve(result[0]);
      }
      else {
        resolve({error: "incorrect login"});
      }
    });
  });
}

module.exports.getPotentionalMatches = function(lowerBoundAge, higherBoundAge, interests, gender) { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT userId, firstName, lastName FROM loginInDetails WHERE email = '${email}' AND password = '${password}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      if (result.length >= 1) {
        resolve(result[0]);
      }
      else {
        resolve({error: "incorrect login"});
      }
    });
  });
}

module.exports.signUp = function(firstName, lastName, email, password) {
  return new Promise(function(resolve, reject) {
    let sqlNoDuplicates = `SELECT * FROM loginInDetails WHERE email = '${email}'`;

    dbConnection.query(sqlNoDuplicates, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      if (result && result?.length >= 1)
      {
        resolve({usedEmail: true, success: false});
      }
      else
      {
        SQL = `INSERT INTO loginInDetails (firstName, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`
        dbConnection.query(SQL, function (err, result) {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve({usedEmail: false, success: true});
        });
      }
    });
  });
}

module.exports.likeFriend = function(userId, friendId) { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT userId FROM loginInDetails WHERE userId = '${friendId}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      if (!result.length) {
        resolve({error: "friend does not exist"});
        return;
      }
    });

    SQL = `SELECT userId, LikedUser FROM likedUsers WHERE userId = '${userId}' AND LikedUser = '${friendId}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      if (result.length) {
        resolve({error: "already liked"});
        return;
      }
    });

    SQL = `INSERT INTO likedUsers (userId, LikedUser) VALUES ('${userId}', '${friendId}')`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      SQL = `SELECT userId FROM likedUsers WHERE userId = '${friendId}' AND LikedUSer = '${userId}'`
      dbConnection.query(SQL, function (err, result) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        if (result.length) {
          resolve({match: true});
        }
        else {
          resolve({match: false});
        }
      });
    });
  });
}

module.exports.getMatches = function(userId) { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT userId FROM likedUsers lu WHERE EXISTS (SELECT LikedUser FROM likedUsers lu2 WHERE lu2.userId = '${userId}' AND lu2.LikedUser = lu.userID) AND lu.LikedUser = '${userId}'`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      if (result.length) {
        resolve(result);
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