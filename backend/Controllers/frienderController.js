const express = require("express");
const app = express()
const port = 3002

app.listen(port, () => {console.log(`Backend server running on port ${port}`)});

const serviceFriender = require('../Services/frienderService');

app.get("/Login", (req, res) => {
    const email = req.email
    const password = req.password

    serviceFriender.getLogins(email, password).then(function(data) {
        res.send(data);
    })
});

app.post("/SignUp", (req, res) => {
    const firstName = req.firstName
    const lastName = req.lastName
    const email = req.email
    const password = req.password

    serviceFriender.signUp(firstName, lastName, email, password).then(function(data) {
        res.send(data);
    })
})

