
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
          resolve({usedEmail: false, success: true, userDetails:{firstName: firstName, lastName: lastName, email: email, userId: result.insertId}});
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
  interests.interestDescription,
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
        console.error(err);
        reject(err);
        return;
      }
      if (result.length >= 1) {
        resolve(result);
      }
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
    let SQL = `SELECT loginInDetails.userId, 
    loginInDetails.firstName, 
    loginInDetails.email, 
    userProfileDetails.profilePictureURL, 
    userProfileDetails.bio, 
    userProfileDetails.userAge, 
    genderLookUp.genderDescription as 'lookingFor', 
    u.genderDescription as 'gender',
    group_concat(interests.interestDescription separator ', ') as interests
    FROM loginInDetails 
    INNER JOIN userProfileDetails ON userProfileDetails.userId = loginInDetails.userId 
    LEFT JOIN userInterest ON userInterest.userId = userProfileDetails.userId
    LEFT JOIN interests ON interests.interestId = userInterest.interestId
    LEFT JOIN genderLookUp ON genderLookUp.genderID = userProfileDetails.lookingFor 
    LEFT JOIN genderLookUp u ON genderLookUp.genderID = userProfileDetails.userId 
    WHERE loginInDetails.userId = ${userId}
    group by loginInDetails.userId`
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

module.exports.postUserProfileDetails = function(profilePictureURL, bio, userAge, lookingFor, userGender, userId) { 
  return new Promise(function(resolve, reject) {
    let SQL = `INSERT INTO userProfileDetails (profilePictureURL, bio, userAge, lookingFor, userGender, userId) VALUES ('${profilePictureURL}', '${bio}', ${userAge}, ${lookingFor}, ${userGender}, ${userId})`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.affectedRows >= 1) {
        resolve({message: "success"});
      }
      else{
        reject({message: "failed"})
      }
    });
  });
}

module.exports.updateUserProfileDetails = function(userId) { 
  return new Promise(function(resolve, reject) {
    let SQL = `UPDATE userProfileDetials SET profilePictureURL = '${profilePictureURL}', bio = '${bio}', userAge = ${userAge}, lookingFor = ${lookingFor}, userGender = ${userGender} WHERE userId = ${userId}`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.affectedRows >= 1) {
        resolve({message: "successfully updated"});
      }
      else{
        reject({message: "failed update"})
      }
    });
  });
}