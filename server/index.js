const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// app.use(cors());
app.use(router);

let players = [];

let playerResponses = [];

io.on("connect", (socket) => {

  socket.on("join", (name) => {
    addUser(socket.id, name);
    console.log(players);
  });

  socket.on("guess", (guess) => {
    const user = getUser(socket.id);
    playerResponses.push({
      userID: user.id,
      response: guess,
      select: 0
    });

    //End game when all players responded or time is up
    if (playerResponses.length == players.length){
      socket.emit("end", {playerResponses: playerResponses});
    }
  });
});


const addUser = (id, name) => {
  players.push({
    id: id,
    name: name
  });
}

const getUser = (id) => players.find((player) => player.id === id);

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));