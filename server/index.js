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
    socket.emit('getPlayers', players)
    console.log(players)
  });

  //Start the round
  socket.on("roundStart", () => {
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
    // i moved the random word selection feature up here 
    // because it seems like players start rounds at different times
    // so they each were getting different words
  });

  //When a player guesses an answer
  socket.on("guess", (guess) => {
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
  });
  

});


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

const getUser = (id) => players.find((player) => player.id === id);

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));