import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import WordCard from './WordCard/WordCard';
import io from "socket.io-client";
import { Link } from "react-router-dom";

let socket;

export default class Game extends Component {

  state = {
    def: "", // user's definition of the word
    playerResponses: []
  }

  componentDidMount() {
    socket = io("http://localhost:5000");
    socket.emit("join", "testPlayer");
    socket.on("end", ({ playerResponses }) => {
        this.setState({
          ...this.state,
          playerResponses: playerResponses
        });
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

  renderResponses = () => {
    this.state.playerResponses.map((playerResponse) => {
      console.log(playerResponse.response);
      return <li key={playerResponse.userID}>{playerResponse.response}</li>
    });
  }

  render() {
    
    return (
      <div>
          <h1 style={{textAlign: "center"}}>Enter the Definition of the Word: </h1>
          
          <WordCard word={"Test"} /> {/* must get word from backend*/}
          
          <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
            <TextField
                type='text'
                name='def' 
                placeholder='Type here: '
                value={this.state.def} // value of text in input is the state's definition
                onChange={this.onChange} //  this.onChange is the name of the method/function in the class
                style={inputStyle}
                />
             {/* <Link onClick={e => (!this.state.def) ? e.preventDefault() : null} to={`/responses?def=${this.state.def}`}>  */}
              <Button color="primary" type="submit">Submit</Button>
            {/* </Link> */}
          </form>

          <ul>
            {     
              this.state.playerResponses.map((playerResponse) => {
                return <li key={playerResponse.userID}>{playerResponse.response}</li>
            }) 
            }
          </ul>

      </div>
    );
  }
}


const inputStyle = {
  padding: '5px', 
  fontSize: '16px',
  width: "100%",
}