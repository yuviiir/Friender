const express = require("express");
const app = express()
const port = 3002

app.get("/", (req, res) => {
    res.send("Friender backend server");
});

app.post("/login", (req, res) => {
    res.status(418);
});

app.get("/matches", (req, res) => {
    res.status(418);
});

app.listen(port, () => {console.log(`Backend server running on port ${port}`)});
