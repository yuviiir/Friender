const express = require("express");
const path = require("path");
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./static/js/messages');


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

//run when the client connections

io.on('connection', socket => {
    console.log('New WS Connectin');
    socket.emit('message', formatMessage('System', 'Welcome to the Friends Chat'))

    socket.broadcast.emit('message', formatMessage('System','User has joined the chat'))

    socket.on('chatMessage', (txtmsg) =>{
        io.emit('message', formatMessage('You', txtmsg))
    })
});


server.listen(process.env.PORT || 3001, () => console.log(`Frontend server running on port 3001...`));

