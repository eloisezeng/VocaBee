import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class GameRoom extends Component {

  render() {
    return (
      <div>
          <h1>Welcome to the game! </h1>
          
          <Button variant="contained" color="primary" onClick={this.props.startGame}>Start Game</Button>
      </div>
    )
  }
}
