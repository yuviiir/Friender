
const dbConnection = require('../DataAccess/Config')
const bcrypt = require('bcryptjs');

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
    let passwordCompare = `SELECT password FROM loginInDetails where email = '${email}'`;

    dbConnection.query(passwordCompare, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
      }
      if (result.length >= 1) {
        if (bcrypt.compareSync(password, result[0].password))
        {
        let SQL = `SELECT userId, firstName, lastName, email FROM loginInDetails WHERE email = '${email}' AND password = '${result[0].password}'`
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
      }
      else{
        resolve({error: "incorrect login"});
      }
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

module.exports.signUp = function(firstName, lastName, email, password, userAge) {
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
        SQL = `INSERT INTO loginInDetails (firstName, lastName, email, password, userAge) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', ${userAge})`
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
  loginInDetails.userAge, 
  group_concat(interests.interestDescription separator ', ') as interests from loginInDetails 
  INNER JOIN userProfileDetails ON userProfileDetails.userId = loginInDetails.userId 
  INNER JOIN userInterest ON userInterest.userId = userProfileDetails.userId 
  INNER JOIN interests ON interests.interestId = userInterest.interestId 
  WHERE interests.interestId IN (SELECT interests.interestId FROM interests INNER JOIN userInterest ON userInterest.interestId = interests.interestId WHERE userInterest.userId = ${userId}) 
  AND loginInDetails.userId != ${userId}
  AND loginInDetails.userId NOT IN (SELECT DISTINCT LikedUser FROM likedUsers WHERE userId = ${userId})
  GROUP BY loginInDetails.userId`

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
      else
      {
        resolve([])
      }
    });
  });
}

module.exports.getMatches = function(userId) { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT lu.userId ,
    loginInDetails.firstName, 
    loginInDetails.email, 
    userProfileDetails.profilePictureURL, 
    userProfileDetails.bio, 
    loginInDetails.userAge, 
    genderLookUp.genderDescription as 'lookingFor', 
    u.genderDescription as 'gender',
    group_concat(interests.interestDescription separator ', ') as interests
    FROM likedUsers lu 
    INNER JOIN userProfileDetails ON userProfileDetails.userId = lu.LikedUser 
    INNER JOIN loginInDetails ON loginInDetails.userId = userProfileDetails.userId
    LEFT JOIN userInterest ON userInterest.userId = userProfileDetails.userId
    LEFT JOIN interests ON interests.interestId = userInterest.interestId
    LEFT JOIN genderLookUp ON genderLookUp.genderID = userProfileDetails.lookingFor 
    LEFT JOIN genderLookUp u ON genderLookUp.genderID = userProfileDetails.userId 
    WHERE EXISTS (SELECT LikedUser FROM likedUsers lu2 WHERE lu2.userId = '${userId}' AND lu2.LikedUser = lu.userID) AND lu.LikedUser = '${userId}'`
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

module.exports.dislikedFriend = function(userId, friendId) { 

  return new Promise(function(resolve, reject) {
    let SQL = `INSERT INTO dislikedUser (userId, dislikedUser) VALUES (${userId}, ${dislikedFriend})`
    dbConnection.query(SQL, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      if (result.affectedRows >= 1) {
        resolve({message: "success"});
      }
      else {
        resolve({message: "failed"});
      }
    });
  })
}

module.exports.getUserProfileDetails = function(userId) { 
  return new Promise(function(resolve, reject) {
    let SQL = `SELECT loginInDetails.userId, 
    loginInDetails.firstName, 
    loginInDetails.email, 
    userProfileDetails.profilePictureURL, 
    userProfileDetails.bio, 
    loginInDetails.userAge, 
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
        reject({})
      }
    });
  });
}

module.exports.postUserProfileDetails = function(profilePictureURL, bio, lookingFor, userGender, userId) { 
  return new Promise(function(resolve, reject) {
    let SQL = `INSERT INTO userProfileDetails (profilePictureURL, bio, lookingFor, userGender, userId) VALUES ('${profilePictureURL}', '${bio}', ${lookingFor}, ${userGender}, ${userId})`
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

module.exports.insertInterests = function(userId, interests) { 
  return new Promise(function(resolve, reject) {
    let complete = false;
    for (let i = 0; i < interests.length; i++) {
      let SQL = `INSERT INTO userInterest (userId, interestId) VALUES (${userId}, ${interests[i]})`
      dbConnection.query(SQL, function (err, result) {
        if (err) {
          throw err;
        }
        if (result.affectedRows >= 1) {
          complete = true
        }
        else{
          complete = false
        }
      });
    }
      resolve({message: "success"});

  });
}

module.exports.updateInterests = function(userId, interestId) { 
  return new Promise(function(resolve, reject) {
    let SQL = `UPDATE userInterest SET interestId = ${interestId} WHERE userId = ${userId}`
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

module.exports.updateUserProfileDetails = function(profilePictureURL, bio, userAge, lookingFor, userId) { 
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