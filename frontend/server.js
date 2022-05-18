const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "static")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static/templates/home.html"));
});

app.get("/404", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static/templates/404.html"));
});

app.get("/profileSetup", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static/templates/profileSetup.html"));
});

app.get("/matches", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static/templates/matches.html"));
});
app.get("/profile", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static/templates/profile.html"));
});

app.listen(process.env.PORT || 3001, () => console.log(`Frontend server running on port 3001...`));