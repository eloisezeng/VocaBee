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

let gameInSession = false;

io.on("connect", (socket) => {
  socket.on("join", (name, callback) => {
    const { error, user } = addUser(socket.id, name);

    if (error) return callback(error);

    if (gameInSession) return callback("game is in session! please restart the server to force quit!");

    console.log("=======USER JOINED========");
    callback();
    console.log(players)
    socket.emit('getPlayers', players)
  });

  //Start the round
  socket.on("roundStart", () => {
    socket.emit('getPlayers', players)
    gameInSession = true;

    let dictionary = {
      "Fustigated": "to beat someone with a stick",
      "Defenestration": "the action of throwing someone out of a window.",
      "Collywobbles": "stomach pain",
      "Bumbershoot": "an umbrella",
      "Donnybrook": "a scene of uproar and disorder"
    }
    const words = Object.keys(dictionary);
    const word = words[ words.length * Math.random() << 0]
    io.emit("gameWord", {word: word, definition: words[word]}); 
  });

  //When a player guesses an answer
  socket.on("guess", (guess) => {
    console.log("when a user guesses...")
    const user = getUser(socket.id);

    if (user){
      playerResponses.push({
        userID: user.id,
        definition: guess,
        select: 0
      });
    }

    //End ro when all players responded or [time is up](not implemented yet)
    if (playerResponses.length == players.length){
      socket.emit("roundEnd", {playerResponses: playerResponses});
      console.log("this round is ending!");
    }
  });

  //When a player picks the true definition of the word
  socket.on("pick", (pickUserID) => {
    console.log("Picked answer: " + pickUserID);
    const real_def_id = players.find((player) => player.name === "real_def").id
    if (pickUserID === real_def_id) { // if the player guesses the correct definition
      players.find((player) => player.id === socket.id).points += 3
    }
    else {
      const player = players.find((player) => player.id === pickUserID)
      player.points += 1
    }
  });
  

});

const getUser = (id) => players.find((player) => player.id === id);

const addUser = (id, name) => {
  const existingPlayer = players.find((player) => player.name === name);

  if (existingPlayer) {
    return {
      error: "Name is taken!"
    }
  }

  const user = {
    id: id,
    name: name,
    points: 0
  }
  
  players.push(user);

  return { user };
}

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
