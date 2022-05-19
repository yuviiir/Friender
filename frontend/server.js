const express = require("express");
const path = require("path");
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { PORT } = require("./config")
const formatMessage = require('./static/js/messages');

app.use("/static", express.static(path.resolve(__dirname, "static")));

app.use('/favicon.ico', express.static('static/images/friender.ico'));

app.use('/config.js', express.static('config.js'));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.resolve(__dirname, "static/templates/home.html"));
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

app.use(function(req,res){
    res.status(404).sendFile(path.resolve(__dirname, "static/templates/404.html"));
});

//run when the client connections

io.on('connection', socket => {
    socket.on('chatMessage', (txtmsg, name) =>{  
        io.emit('message', formatMessage(name, txtmsg))
    })
});

server.listen(PORT || 3001, () => console.log(`Frontend server running on port ${PORT}...`));