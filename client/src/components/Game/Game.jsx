import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import WordCard from './WordCard/WordCard';
import io from "socket.io-client";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Responses from '../Responses/Responses';
import Leaderboard from '../Leaderboard/Leaderboard';
import { Redirect } from 'react-router';
import GameRoom from './GameRoom/GameRoom';

let socket;

export default class Game extends Component {

  state = {
    def: "", // user's definition of the word
    playerResponses: [],
    redirect: false,
    word: "",
    real_def: "",
    players: [],
  }

  componentDidMount() {
    const { name } = queryString.parse(window.location.search);

    //Initializing Socket.io connection
    this.socket = io("http://localhost:5000");

    //Use the Socket.io connection to make a join request
    this.socket.emit("join", name, (error) => {
      
      if (error) {
        console.log("Error! " + error);
        this.setState({
          ...this.state,
          redirect: true,
        });
      }
    });
    
    // Get the player names and points when the round starts
    this.socket.on("getPlayers", (players) => {
      this.setState({
        ...this.state,
        players: players
      })
    })

    //When socket emits gameWord (when the round starts)
    this.socket.on("gameWord", (gameWord) => {
      console.log("Game Word: " + gameWord.word);
      this.setState({
        ...this.state,
        word: gameWord.word,
        real_def: gameWord.definition,
      });
    });
    
    //When the Socket.io tells the client that the round has ended
    this.socket.on("roundEnd", ({ playerResponses }) => {
      // Client console.log is in the browser console
      this.setState({
        ...this.state,
        playerResponses: playerResponses
      }); 
      // Add the original defintion to become part of the playerResponses
      this.setState({
        ...this.state,
        playerResponses: [...this.state.playerResponses, { name: "real_def", guess: this.state.real_def , points: 0}]
      });
      console.log(playerResponses);
    });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value})
  onSubmit = (e) => {
    e.preventDefault() // prevent form from submitting to actual file
    console.log("submitting a def")
    // call props method so you can pass up the method App

    // this.props.submitDef(this.state.def)

    socket.emit("guess", this.state.def); //Sending the backend the player's response

    //Reset
    this.setState({ def: ""})   
  }
  
  startGame = () => {
    this.socket.emit("roundStart");
  }

  playerSelects = (guessUserID) => {
    console.log(guessUserID)
    this.socket.emit("pick", guessUserID);
  }

  render() {
    if (this.state.redirect){
      return <Redirect to='/' />
    }

    if (this.state.word === ""){
      return (
        <GameRoom startGame={this.startGame} />
      );
    }
    
    if (this.state.playerResponses.length === 0){
      return (
        <div>
            <div>
              <h1 style={{textAlign: "center"}}>Enter the Definition of the Word: </h1>
              
              <WordCard word={this.state.word} /> {/* must get word from backend*/}
              
              <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <TextField
                    type='text'
                    name='def' 
                    placeholder='Type here: '
                    value={this.state.def} // value of text in input is the state's definition
                    onChange={this.onChange} //  this.onChange is the name of the method/function in the class
                    style={inputStyle}
                    />

                <Button color="primary" type="submit">Submit</Button>
              </form>
            </div>

            <Leaderboard players={this.state.players} />
        </div>
      );
    } 

    return (
      <div>
          <Responses responses={this.state.playerResponses} onSubmit={this.playerSelects} />
          <Leaderboard players={this.state.players} />
      </div>
    )
    
  }
}


const inputStyle = {
  padding: '5px', 
  fontSize: '16px',
  width: "100%",
}