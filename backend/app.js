const express = require("express");
const app = express()
const port = 3002

app.get("/", (req, res) => {
    res.send("Friender backend server");
});

app.post("/login", (req, res) => {
    res.status(418);
});

app.get("/matches/:userId", (req, res) => {
    let userId = req.params.userId;

    res.status(418);
});

app.get("/userProfileDetails/:userId", (req, res) => {
    let userId = req.params.userId;

    res.status(418);
});

app.post("/userProfileDetails/:userId", (req, res) => {
    let userId = req.params.userId;
    let details = req.body;

    res.status(418);
});

app.patch("/userProfileDetails/:userId", (req, res) => {
    let userId = req.params.userId;
    let details = req.body;

    res.status(418);
});

app.get("/chats/:friendId", (req, res) => {
    let fiendId = req.params.userId;
    let {userId}

    res.status(418);
});

app.post("/like/:friendId", (req, res) => {
    let friendId = req.params.friendId;
    let { userId } = req.body;

    res.status(418);
});

app.post("/message/:recipientId", (req, res) => {
    let recipientId = req.params.userId;
    let { senderId, message } = req.body;

    res.status(418);
});

app.listen(port, () => {console.log(`Backend server running on port ${port}`)});
