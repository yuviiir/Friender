const express = require("express");
const app = express()
const port = 3002

app.get("/", (req, res) => {
    res.send("Friender backend server");
});

app.post("/login", (req, res) => {
    res.status(418).send("I tried... kinda");
});

app.get("/matches/:userId", (req, res) => {
    let userId = req.params.userId;

    res.status(418).send("No matches for you! No one likes you.");
});

app.get("/userProfileDetails/:userId", (req, res) => {
    let userId = req.params.userId;

    res.status(418).send("Patience chile...");
});

app.post("/userProfileDetails/:userId", (req, res) => {
    let userId = req.params.userId;
    let details = req.body;

    res.status(418).send("Ha, as if.");
});

app.patch("/userProfileDetails/:userId", (req, res) => {
    let userId = req.params.userId;
    let details = req.body;

    res.status(418).send(";-)");
});

app.get("/:userId/messages/:friendId", (req, res) => {
    let friendId = req.params.friendId;
    let userId = req.params.userId;

    res.status(418).send("Optimistic much?");
});

app.post("/:userId/like/:friendId", (req, res) => {
    let friendId = req.params.friendId;
    let userId = req.params.userId;

    res.status(418).send("Don't get ahead of yourself.");
});

app.post("/message/:recipientId", (req, res) => {
    let recipientId = req.params.userId;
    let { senderId, message } = req.body;

    res.status(418).send("All good things to those who wait.");
});

app.listen(port, () => {console.log(`Backend server running on port ${port}`)});
