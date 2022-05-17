const express = require("express");
const serviceFriender = require('../Services/frienderService');
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Friender backend server");
});

router.get("/test", (req, res) => {
  let email = "pieterk@bbd.co.za";
  let password = "123";
  serviceFriender.getLogins(email, password).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(404).send(error);
  }) 
});

router.get("/genderOptions", (req, res) => {
  serviceFriender.getAllGenders().then((data) => {
    res.send(data);
  }, (error) => {
    res.status(500).send({error: "There was an error completing this request."});
  }) 
});

router.get("/interestOptions", (req, res) => {
  res.send("Friender backend server");
});

router.post("/signUp", (req, res) => {
  let {
    firstName, 
    lastName, 
    email, 
    password
   } = req.body

  serviceFriender.signUp(firstName, lastName, email, password).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(404).send(error);
  }) 
})

router.post("/login", (req, res) => {
  let { 
    email, 
    password 
  } = req.body;

  serviceFriender.getLogins(email, password).then((data) => {
    res.send(data);
  }, (error) => {
    res.status(404).send(error);
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

  res.status(418).send("Don't get ahead of yourself.");
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