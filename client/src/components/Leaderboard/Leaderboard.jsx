import React, { Component } from 'react';
// import { TextField } from '@material-ui/core';

export default class Game extends Component {
  state = {
      next: false, // if true, give another question
      end: false // if true, end the game
      }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value})
  onSubmit = (e) => {
      e.preventDefault() // prevent form from submitting to actual file
      console.log("Go to next round")
      }

  render() {
    return (
      <div>
        <h1>Leaderboard</h1>
        <button>Next</button>
        <button>End Game</button>
      </div>
    );
  }
}
