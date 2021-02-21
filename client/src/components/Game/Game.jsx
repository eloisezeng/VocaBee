import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import WordCard from './WordCard/WordCard';
import io from "socket.io-client";
import { Link } from "react-router-dom";

let socket;

export default class Game extends Component {

  state = {
    def: "" // user's definition of the word
  }

  componentDidMount() {
    socket = io("http://localhost:5000");
    console.log("mounted!");

    // socket.emit("join", "testPlayer");
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

  render() {
    
    return (
      <div>
          <h3>VocaBee</h3>
          <h3>Enter the Definition of the Word</h3>
          
          <WordCard word={"Test"} />
          
          <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
            <TextField
                type='text'
                name='def' 
                placeholder='Enter the Definition of the Word: '
                value={this.state.def} // value of text in input is the state's definition
                onChange={this.onChange} //  this.onChange is the name of the method/function in the class
                style={inputStyle}
                />
             <Link onClick={e => (!this.state.def) ? e.preventDefault() : null} to={`/responses?def=${this.state.def}`}> 
              <Button color="primary">Submit</Button>
            </Link>
          </form>
      </div>
    );
  }
}


const inputStyle = {
  padding: '5px', 
  fontSize: '16px',
  width: "100%",
}