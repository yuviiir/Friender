
const dbConnection = require('../DataAccess/Config')

module.exports.getAllGenders = function() { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT genderId, genderDescription FROM genderLookUp`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
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

module.exports.getFriends = function(userId) {

  let SQLGetPeeps = `SELECT loginInDetails.userId, 
  loginInDetails.firstName, 
  userProfileDetails.bio, 
  userProfileDetails.profilePictureURL, 
  userProfileDetails.userAge from loginInDetails 
  INNER JOIN userProfileDetails ON userProfileDetails.userId = loginInDetails.userId 
  INNER JOIN userInterest ON userInterest.userId = userProfileDetails.userId 
  INNER JOIN interests ON interests.interestId = userInterest.interestId 
  WHERE interests.interestId IN (SELECT interests.interestId FROM interests INNER JOIN userInterest ON userInterest.interestId = interests.interestId WHERE userInterest.userId = ${userId}) 
  AND loginInDetails.userId != ${userId}
  AND loginInDetails.userId NOT IN (SELECT DISTINCT LikedUser FROM likedUsers WHERE userId = ${userId})`

  return new Promise(function(resolve, reject) {
    dbConnection.query(SQLGetPeeps, function (err, result) {
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