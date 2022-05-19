const express = require("express");
const serviceFriender = require('../Services/frienderService');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded();
const bcrypt = require('bcryptjs');

router.get("/", (req, res) => {
  res.send("Friender backend server");
});

router.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}))

router.use(jsonParser);


router.get("/test", (req, res) => {
  serviceFriender.test().then((data) => {
    res.send(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  }) 
});

router.get("/genderOptions", (req, res) => {
  serviceFriender.getAllGenders().then((data) => {
    res.json(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  }) 
});

router.get("/interestOptions", (req, res) => {
  serviceFriender.getAllInterests().then((data) => {
    res.json(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  }) 
});

router.post("/signUp", (req, res) => {
  let { 
    firstName, 
    lastName, 
    email, 
    password,
    userAge
   } = req.body
   ;

   let passwordHash = bcrypt.hashSync(password, 10);

  serviceFriender.signUp(firstName, lastName, email, passwordHash, userAge).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  }) 
})

router.get("/login/", (req, res) => {
  let  {
    email, 
    password
   } = req.query

  serviceFriender.getLogins(email, password).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  })
});

router.get("/getFriends", (req, res) => {
  let userId = req.query.userId;
  serviceFriender.getFriends(userId).then((data) => { res.send(data)}, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  });
});

router.get("/getUserProfileDetails", (req, res) => {
  let userId = req.query.userId;

  serviceFriender.getUserProfileDetails(userId).then((data) => {
    res.send(data)
  }, (err) => res.status(500).send({error: "There was an error completing this request."}))
});

router.post("/postUserProfileDetails", (req, res) => {
  let userId = req.body.userId;
  let profilePictureURL = req.body.profilePictureURL;
  let bio = req.body.bio;
  let lookingFor = req.body.lookingFor;
  let gender = req.body.gender;


  serviceFriender.postUserProfileDetails(profilePictureURL, bio, lookingFor, gender, userId).then((data) => {
    res.send(data)
  }, (err) => res.status(500).send({error: "There was an error completing this request."}))
});

router.post("/updatUserProfileDetails", (req, res) => {
  let userId = req.query.userId;
  let profilePictureURL = req.query.profilePictureURL;
  let bio = req.query.bio;
  let userAge = req.query.userAge;
  let lookingFor = req.query.lookingFor;
  let gender = req.query.gender;

  serviceFriender.updateUserProfileDetails(profilePictureURL, bio, userAge, lookingFor, gender, userId).then((data) => {
    res.send(data)
  }, (err) => res.status(500).send({error: "There was an error completing this request."}))
});

router.post("/like", (req, res) => {
  let {
    userId,
    friendId
   } = req.body;

  serviceFriender.likeFriend(userId, friendId).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  }) 
});

// Messages API may change to sockets:

router.post("/insertInterest", (req, res) => {
  let userId = req.body.userId;
  let interests = req.body.interests
  
  serviceFriender.insertInterests(userId, interests).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  })
});

router.post("updateInterest", (req, res) => {
  let userId = req.query.friendId;
  let interestId = req.query.userId;

  serviceFriender.updateInterests(userId, interestId).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  })
});

router.post("/message/:recipientId", (req, res) => {
    let recipientId = req.params.userId;
    let { senderId, message } = req.body;

    res.status(418).send("All good things to those who wait.");
});

module.exports = router