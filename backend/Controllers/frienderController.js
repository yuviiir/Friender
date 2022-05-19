const express = require("express");
const serviceFriender = require('../Services/frienderService');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded();

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
    password
   } = req.body
   ;

  serviceFriender.signUp(firstName, lastName, email, password).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  }) 
})

router.get("/login/", (req, res) => {
  let  {
    email, 
    password
   } = req.body

  serviceFriender.getLogins(email, password).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  })
});

router.get("/matches/:userId", (req, res) => {
  let userId = req.params.userId;

  res.status(418).send("No matches for you! No one likes you.");
});

router.get("/userProfileDetails/:userId", (req, res) => {
  let userId = req.params.userId;

  res.status(418).send("Patience chile...");
});

router.post("/userProfileDetails/:userId", (req, res) => {
  let userId = req.params.userId;
  let details = req.body;

  res.status(418).send("Ha, as if.");
});

router.patch("/userProfileDetails/:userId", (req, res) => {
  let userId = req.params.userId;
  let details = req.body;

  res.status(418).send(";-)");
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

router.get("/:userId/messages/:friendId", (req, res) => {
  let friendId = req.params.friendId;
  let userId = req.params.userId;

  res.status(418).send("Optimistic much?");
});

router.post("/message/:recipientId", (req, res) => {
    let recipientId = req.params.userId;
    let { senderId, message } = req.body;

    res.status(418).send("All good things to those who wait.");
});

module.exports = router